import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import { getWeekDays, getCurrentWeek, formatDate } from '@/utils/formatDate';

// Mock timetable data
const mockTimetable = {
  'Monday': [
    { id: '1', subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', attendance: 'present' },
    { id: '2', subject: 'Physics', time: '11:00 AM - 12:00 PM', room: 'Lab 201', attendance: null },
    { id: '3', subject: 'Chemistry', time: '2:00 PM - 3:00 PM', room: 'Room 103', attendance: 'absent' },
  ],
  'Tuesday': [
    { id: '4', subject: 'Computer Science', time: '8:00 AM - 9:00 AM', room: 'Lab 301', attendance: 'present' },
    { id: '5', subject: 'Mathematics', time: '10:00 AM - 11:00 AM', room: 'Room 101', attendance: 'present' },
    { id: '6', subject: 'English', time: '1:00 PM - 2:00 PM', room: 'Room 105', attendance: null },
  ],
  'Wednesday': [
    { id: '7', subject: 'Physics Lab', time: '9:00 AM - 11:00 AM', room: 'Lab 202', attendance: null },
    { id: '8', subject: 'Chemistry', time: '2:00 PM - 3:00 PM', room: 'Room 103', attendance: null },
  ],
  'Thursday': [
    { id: '9', subject: 'Mathematics', time: '9:00 AM - 10:00 AM', room: 'Room 101', attendance: null },
    { id: '10', subject: 'Computer Science', time: '11:00 AM - 12:00 PM', room: 'Lab 301', attendance: null },
    { id: '11', subject: 'English', time: '2:00 PM - 3:00 PM', room: 'Room 105', attendance: null },
  ],
  'Friday': [
    { id: '12', subject: 'Physics', time: '10:00 AM - 11:00 AM', room: 'Lab 201', attendance: null },
    { id: '13', subject: 'Chemistry Lab', time: '1:00 PM - 3:00 PM', room: 'Lab 301', attendance: null },
  ],
  'Saturday': [
    { id: '14', subject: 'Study Hall', time: '9:00 AM - 11:00 AM', room: 'Library', attendance: null },
  ],
  'Sunday': [],
};

interface Class {
  id: string;
  subject: string;
  time: string;
  room: string;
  attendance: 'present' | 'absent' | null;
}

const Timetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isEditing, setIsEditing] = useState(false);
  const weekDays = getWeekDays();
  const currentWeek = getCurrentWeek();

  const handleAttendanceToggle = (classId: string, currentStatus: 'present' | 'absent' | null) => {
    // Cycle through: null -> present -> absent -> null
    const nextStatus = currentStatus === null ? 'present' : 
                      currentStatus === 'present' ? 'absent' : null;
    
    console.log(`Toggle attendance for ${classId}: ${currentStatus} -> ${nextStatus}`);
    // Here you would update the attendance in your state/API
  };

  const getAttendanceIcon = (status: 'present' | 'absent' | null) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-error" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getAttendanceText = (status: 'present' | 'absent' | null) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      default:
        return 'Mark';
    }
  };

  const ClassCard: React.FC<{ cls: Class; dayIndex: number }> = ({ cls, dayIndex }) => {
    const isToday = dayIndex === new Date().getDay() - 1 || (new Date().getDay() === 0 && dayIndex === 6);
    
    return (
      <Card className={`card-base ${isToday ? 'border-primary/50 bg-primary/5' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="heading-md mb-1">{cls.subject}</h3>
              <p className="small-text text-muted-foreground mb-1">{cls.time}</p>
              <p className="small-text text-muted-foreground">{cls.room}</p>
            </div>
            
            {isEditing && (
              <div className="flex items-center gap-1 ml-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-error hover:text-error">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAttendanceToggle(cls.id, cls.attendance)}
            className={`w-full ${
              cls.attendance === 'present' ? 'status-present border-success' :
              cls.attendance === 'absent' ? 'status-absent border-error' :
              'hover:bg-muted'
            }`}
          >
            {getAttendanceIcon(cls.attendance)}
            <span className="ml-2">{getAttendanceText(cls.attendance)}</span>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl">Timetable</h1>
          <p className="body-text text-muted-foreground">
            Manage your weekly schedule and track attendance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Done' : 'Edit'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <Card className="card-base">
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const date = currentWeek[index];
              const isToday = new Date().toDateString() === date.toDateString();
              const classCount = mockTimetable[day as keyof typeof mockTimetable]?.length || 0;
              
              return (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "ghost"}
                  onClick={() => setSelectedDay(day)}
                  className={`flex flex-col h-auto py-3 ${isToday ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                >
                  <span className="text-xs font-medium">{day.slice(0, 3)}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  {classCount > 0 && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {classCount} classes
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Schedule */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {selectedDay} Schedule
          </h2>
          <div className="text-right">
            <p className="small-text text-muted-foreground">
              {formatDate(currentWeek[weekDays.indexOf(selectedDay)])}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(mockTimetable[selectedDay as keyof typeof mockTimetable] || []).length > 0 ? (
            (mockTimetable[selectedDay as keyof typeof mockTimetable] || []).map((cls) => (
              <ClassCard 
                key={cls.id} 
                cls={cls} 
                dayIndex={weekDays.indexOf(selectedDay)} 
              />
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3">
              <Card className="card-base">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="heading-md mb-2">No classes scheduled</h3>
                  <p className="body-text text-muted-foreground mb-4">
                    {selectedDay} is free! You can add new classes or enjoy your break.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Add Class Card - Only show when editing */}
          {isEditing && (mockTimetable[selectedDay as keyof typeof mockTimetable] || []).length > 0 && (
            <Card className="card-base border-dashed border-2 border-primary/30 bg-primary/5">
              <CardContent className="p-8 text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="body-text text-primary font-medium">Add New Class</p>
                <p className="small-text text-muted-foreground">Click to schedule a new class</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;