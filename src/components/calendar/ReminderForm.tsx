import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Target, TrendingUp, AlertCircle, Bell } from "lucide-react";
import { format } from "date-fns";

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  date: Date;
  type: "sip" | "goal" | "tip" | "reminder";
  amount?: string;
}

interface ReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: Reminder) => void;
  editingReminder?: Reminder | null;
}

export function ReminderForm({ isOpen, onClose, onSave, editingReminder }: ReminderFormProps) {
  const [formData, setFormData] = useState({
    title: editingReminder?.title || "",
    description: editingReminder?.description || "",
    date: editingReminder?.date || new Date(),
    type: editingReminder?.type || "reminder" as const,
    amount: editingReminder?.amount || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reminder: Reminder = {
      id: editingReminder?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      type: formData.type,
      amount: formData.amount
    };

    onSave(reminder);
    onClose();
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      date: new Date(),
      type: "reminder",
      amount: ""
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sip":
        return <Target className="w-4 h-4" />;
      case "goal":
        return <TrendingUp className="w-4 h-4" />;
      case "tip":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingReminder ? "Edit Reminder" : "Add New Reminder"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter reminder title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add additional details"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(formData.date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => date && setFormData({ ...formData, date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "sip" | "goal" | "tip" | "reminder") => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reminder">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon("reminder")}
                    <span>General Reminder</span>
                  </div>
                </SelectItem>
                <SelectItem value="sip">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon("sip")}
                    <span>SIP Payment</span>
                  </div>
                </SelectItem>
                <SelectItem value="goal">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon("goal")}
                    <span>Goal Milestone</span>
                  </div>
                </SelectItem>
                <SelectItem value="tip">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon("tip")}
                    <span>Educational Tip</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.type === "sip" || formData.type === "goal") && (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="₹10,000"
              />
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary text-white">
              {editingReminder ? "Update" : "Save"} Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}