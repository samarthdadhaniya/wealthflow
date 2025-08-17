import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, X, UserPlus, Calculator, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SplitBillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSplitBill: (bill: {
    description: string;
    totalAmount: number;
    participants: { name: string; amount: number; settled: boolean }[];
    date: string;
  }) => void;
}

interface Participant {
  id: string;
  name: string;
  amount: number;
  settled: boolean;
}

export function SplitBillsModal({ isOpen, onClose, onAddSplitBill }: SplitBillsModalProps) {
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You", amount: 0, settled: true }
  ]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [splitMethod, setSplitMethod] = useState<"equal" | "custom">("equal");
  const { toast } = useToast();

  const addParticipant = () => {
    if (newParticipantName.trim()) {
      const newParticipant: Participant = {
        id: Date.now().toString(),
        name: newParticipantName.trim(),
        amount: 0,
        settled: false
      };
      setParticipants(prev => [...prev, newParticipant]);
      setNewParticipantName("");
      calculateSplit();
    }
  };

  const removeParticipant = (id: string) => {
    if (participants.length > 1) {
      setParticipants(prev => prev.filter(p => p.id !== id));
      calculateSplit();
    }
  };

  const calculateSplit = () => {
    const amount = parseFloat(totalAmount) || 0;
    if (splitMethod === "equal" && participants.length > 0) {
      const amountPerPerson = amount / participants.length;
      setParticipants(prev => prev.map(p => ({
        ...p,
        amount: amountPerPerson
      })));
    }
  };

  const updateParticipantAmount = (id: string, amount: number) => {
    setParticipants(prev => prev.map(p => 
      p.id === id ? { ...p, amount } : p
    ));
  };

  const handleSubmit = () => {
    if (!description.trim() || !totalAmount || participants.length < 2) {
      toast({
        title: "Invalid Bill",
        description: "Please fill all fields and add at least one other participant.",
        variant: "destructive",
      });
      return;
    }

    const totalSplit = participants.reduce((sum, p) => sum + p.amount, 0);
    const billAmount = parseFloat(totalAmount);
    
    if (Math.abs(totalSplit - billAmount) > 0.01) {
      toast({
        title: "Amount Mismatch",
        description: `Split amounts (₹${totalSplit.toFixed(2)}) don't match total bill (₹${billAmount}).`,
        variant: "destructive",
      });
      return;
    }

    onAddSplitBill({
      description,
      totalAmount: billAmount,
      participants: participants.map(p => ({
        name: p.name,
        amount: p.amount,
        settled: p.settled
      })),
      date: new Date().toISOString().split('T')[0]
    });

    // Reset form
    setDescription("");
    setTotalAmount("");
    setParticipants([{ id: "1", name: "You", amount: 0, settled: true }]);
    setSplitMethod("equal");
    onClose();

    toast({
      title: "Bill Added",
      description: "Split bill has been created successfully.",
    });
  };

  const totalSplit = participants.reduce((sum, p) => sum + p.amount, 0);
  const billAmount = parseFloat(totalAmount) || 0;
  const isAmountMatched = Math.abs(totalSplit - billAmount) < 0.01;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Split Bills</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Bill Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Bill Description</Label>
              <Input
                id="description"
                placeholder="e.g., Dinner at Restaurant, Movie Tickets..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount (₹)</Label>
              <Input
                id="totalAmount"
                type="number"
                placeholder="0"
                value={totalAmount}
                onChange={(e) => {
                  setTotalAmount(e.target.value);
                  setTimeout(calculateSplit, 100);
                }}
              />
            </div>
          </div>

          {/* Split Method */}
          <div className="space-y-3">
            <Label>Split Method</Label>
            <div className="flex space-x-2">
              <Button
                variant={splitMethod === "equal" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSplitMethod("equal");
                  calculateSplit();
                }}
              >
                Equal Split
              </Button>
              <Button
                variant={splitMethod === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => setSplitMethod("custom")}
              >
                Custom Split
              </Button>
            </div>
          </div>

          {/* Add Participants */}
          <div className="space-y-3">
            <Label>Add Participants</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter name..."
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addParticipant()}
              />
              <Button onClick={addParticipant} size="sm">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Participants List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Participants ({participants.length})</Label>
              <div className="flex items-center space-x-2 text-sm">
                <DollarSign className="w-4 h-4" />
                <span className={isAmountMatched ? "text-success" : "text-destructive"}>
                  ₹{totalSplit.toFixed(2)} / ₹{billAmount.toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {participants.map((participant) => (
                <Card key={participant.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        {participant.name === "You" && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {splitMethod === "custom" ? (
                        <Input
                          type="number"
                          value={participant.amount}
                          onChange={(e) => updateParticipantAmount(participant.id, parseFloat(e.target.value) || 0)}
                          className="w-20"
                          step="0.01"
                        />
                      ) : (
                        <span className="font-medium text-primary">
                          ₹{participant.amount.toFixed(2)}
                        </span>
                      )}
                      
                      {participant.name !== "You" && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeParticipant(participant.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Summary */}
          {billAmount > 0 && participants.length > 1 && (
            <Card className={`p-4 ${isAmountMatched ? 'bg-success-light border-success' : 'bg-destructive-light border-destructive'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Split Summary</p>
                  <p className="text-sm opacity-70">
                    {isAmountMatched ? "Amounts balanced" : "Amounts don't match"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{billAmount.toFixed(2)}</p>
                  <p className="text-sm opacity-70">Total Bill</p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isAmountMatched || !description.trim() || participants.length < 2}
            >
              Create Split Bill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}