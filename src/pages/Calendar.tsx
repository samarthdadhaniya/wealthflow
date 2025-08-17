import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReminderForm, type Reminder } from "@/components/calendar/ReminderForm";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Target,
  TrendingUp,
  AlertCircle,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const defaultEvents = [
  {
    id: "1",
    title: "SIP Due - Axis Bluechip Fund",
    date: new Date(currentYear, currentMonth, 15),
    type: "sip" as const,
    amount: "₹5,000"
  },
  {
    id: "2",
    title: "SIP Due - HDFC Small Cap Fund",
    date: new Date(currentYear, currentMonth, 20),
    type: "sip" as const,
    amount: "₹3,000"
  },
  {
    id: "3",
    title: "Emergency Fund Review",
    date: new Date(currentYear, currentMonth, 25),
    type: "goal" as const,
    amount: "₹2,50,000"
  },
  {
    id: "4",
    title: "Portfolio Rebalancing Reminder",
    date: new Date(currentYear, currentMonth, 28),
    type: "tip" as const
  }
];

const upcomingEvents = [
  {
    title: "SIP Payment - Axis Bluechip Fund",
    date: "Tomorrow",
    amount: "₹5,000",
    type: "sip",
    urgent: true
  },
  {
    title: "Goal Achievement - Emergency Fund",
    date: "Dec 25, 2024",
    amount: "₹2,50,000",
    type: "goal",
    urgent: false
  },
  {
    title: "Portfolio Review Reminder",
    date: "Dec 28, 2024",
    amount: "",
    type: "tip",
    urgent: false
  },
  {
    title: "Tax Saving Fund SIP",
    date: "Jan 1, 2025",
    amount: "₹2,000",
    type: "sip",
    urgent: false
  }
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [viewYear, setViewYear] = useState(currentYear);
  const [reminders, setReminders] = useState<Reminder[]>(defaultEvents);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getEventsForDate = (date: number) => {
    return reminders.filter(reminder => {
      const reminderDate = new Date(reminder.date);
      return reminderDate.getDate() === date && 
             reminderDate.getMonth() === viewMonth && 
             reminderDate.getFullYear() === viewYear;
    });
  };

  const handleSaveReminder = (reminder: Reminder) => {
    if (editingReminder) {
      setReminders(prev => prev.map(r => r.id === reminder.id ? reminder : r));
      setEditingReminder(null);
    } else {
      setReminders(prev => [...prev, reminder]);
    }
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setShowReminderForm(true);
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "sip":
        return "bg-primary text-primary-foreground";
      case "goal":
        return "bg-success text-success-foreground";
      case "tip":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = day === currentDate.getDate() && 
                     viewMonth === currentMonth && 
                     viewYear === currentYear;
      const isSelected = day === selectedDate;
      
      days.push(
        <div
          key={day}
          className={`p-3 cursor-pointer rounded-lg transition-all duration-200 relative ${
            isToday ? "bg-primary text-primary-foreground font-semibold" :
            isSelected ? "bg-secondary text-secondary-foreground" :
            "hover:bg-secondary"
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <span className="text-sm">{day}</span>
          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 right-1 flex space-x-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    event.type === "sip" ? "bg-primary" :
                    event.type === "goal" ? "bg-success" :
                    event.type === "tip" ? "bg-warning" :
                    "bg-accent"
                  }`}
                />
              ))}
              {dayEvents.length > 3 && (
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Investment Calendar
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your SIP dates, goals, and financial reminders
              </p>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-primary text-white shadow-soft"
              onClick={() => setShowReminderForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-card">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {monthNames[viewMonth]} {viewYear}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">SIP Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Goals & Milestones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Tips & Reminders</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="p-6 bg-gradient-card">
                <h3 className="font-semibold text-foreground mb-4">
                  Events for {monthNames[viewMonth]} {selectedDate}
                </h3>
                {(() => {
                  const dayEvents = getEventsForDate(selectedDate);
                  if (dayEvents.length > 0) {
                    return (
                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <div key={event.id} className="p-4 bg-secondary rounded-lg">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                event.type === "sip" ? "bg-primary-light text-primary" :
                                event.type === "goal" ? "bg-success-light text-success" :
                                event.type === "tip" ? "bg-warning-light text-warning" :
                                "bg-accent-light text-accent"
                              }`}>
                                {event.type === "sip" ? <Target className="w-4 h-4" /> :
                                 event.type === "goal" ? <TrendingUp className="w-4 h-4" /> :
                                 event.type === "tip" ? <AlertCircle className="w-4 h-4" /> :
                                 <Bell className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-foreground text-sm">
                                  {event.title}
                                </h4>
                                {event.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {event.description}
                                  </p>
                                )}
                                {event.amount && (
                                  <p className="text-sm font-semibold text-primary mt-1">
                                    {event.amount}
                                  </p>
                                )}
                                <Badge className={`${getEventTypeColor(event.type)} text-xs mt-2`}>
                                  {event.type === "sip" ? "SIP Payment" :
                                   event.type === "goal" ? "Goal Milestone" :
                                   event.type === "tip" ? "Educational Tip" :
                                   "Reminder"}
                                </Badge>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8"
                                  onClick={() => handleEditReminder(event)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-8 h-8 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteReminder(event.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <p className="text-muted-foreground text-sm">
                        No events scheduled for this date
                      </p>
                    );
                  }
                })()}
              </Card>
            )}

            {/* Upcoming Events */}
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                <Bell className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    event.urgent ? "bg-primary-light border border-primary/20" : "bg-secondary"
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        event.type === "sip" ? "bg-primary-light text-primary" :
                        event.type === "goal" ? "bg-success-light text-success" :
                        "bg-warning-light text-warning"
                      }`}>
                        {event.type === "sip" ? <Target className="w-4 h-4" /> :
                         event.type === "goal" ? <TrendingUp className="w-4 h-4" /> :
                         <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium text-sm ${
                          event.urgent ? "text-primary" : "text-foreground"
                        }`}>
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.date}
                        </p>
                        {event.amount && (
                          <p className="text-sm font-semibold text-primary mt-1">
                            {event.amount}
                          </p>
                        )}
                      </div>
                      {event.urgent && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold text-foreground mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SIP Payments</span>
                  <span className="font-semibold text-foreground">8 scheduled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <span className="font-semibold text-primary">₹15,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Goals Due</span>
                  <span className="font-semibold text-success">2 milestones</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Reminder Form Modal */}
        <ReminderForm
          isOpen={showReminderForm}
          onClose={() => {
            setShowReminderForm(false);
            setEditingReminder(null);
          }}
          onSave={handleSaveReminder}
          editingReminder={editingReminder}
        />
      </div>
    </div>
  );
}