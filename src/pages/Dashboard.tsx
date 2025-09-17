import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp,
  Users,
  Plus
} from 'lucide-react';

// Mock data - replace with real API data
const mockData = {
  attendanceStats: [
    { subject: 'Mathematics', present: 28, total: 30, percentage: 93 },
    { subject: 'Physics', present: 25, total: 28, percentage: 89 },
    { subject: 'Chemistry', present: 22, total: 26, percentage: 85 },
    { subject: 'Computer Science', present: 30, total: 32, percentage: 94 },
  ],
  upcomingClasses: [
    { subject: 'Mathematics', time: '9:00 AM', room: 'Room 101', isNext: true },
    { subject: 'Physics Lab', time: '11:00 AM', room: 'Lab 201', isNext: false },
    { subject: 'Chemistry', time: '2:00 PM', room: 'Room 103', isNext: false },
  ],
  currentClass: {
    subject: 'Computer Science',
    time: '8:00 AM - 9:00 AM',
    room: 'Lab 301',
    isActive: true,
  },
  recentNotes: [
    { id: '1', title: 'Calculus - Derivatives', date: '2 hours ago', subject: 'Mathematics' },
    { id: '2', title: 'Quantum Physics Notes', date: '1 day ago', subject: 'Physics' },
    { id: '3', title: 'Organic Chemistry Lab Report', date: '2 days ago', subject: 'Chemistry' },
  ],
  todayStats: {
    totalClasses: 5,
    attended: 4,
    notes: 12,
    assignments: 3,
  }
};

const Dashboard: React.FC = () => {
  const handleMarkAttendance = (status: 'present' | 'absent') => {
    // Handle attendance marking
    console.log(`Marked as ${status}`);
  };

  const overallAttendance = 
    mockData.attendanceStats.reduce((acc, stat) => acc + stat.percentage, 0) / 
    mockData.attendanceStats.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl text-foreground">Dashboard</h1>
          <p className="body-text text-muted-foreground">
            Welcome back! Here's your academic overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            View Timetable
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-base">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="small-text text-muted-foreground">Today's Classes</p>
                <p className="heading-lg">
                  {mockData.todayStats.attended}/{mockData.todayStats.totalClasses}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="small-text text-muted-foreground">Overall Attendance</p>
                <p className="heading-lg">{overallAttendance.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="small-text text-muted-foreground">Total Notes</p>
                <p className="heading-lg">{mockData.todayStats.notes}</p>
              </div>
              <FileText className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="small-text text-muted-foreground">Assignments</p>
                <p className="heading-lg">{mockData.todayStats.assignments}</p>
              </div>
              <BookOpen className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Class */}
        <Card className="card-base lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Current Class
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.currentClass.isActive ? (
              <>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <h3 className="heading-md text-primary">{mockData.currentClass.subject}</h3>
                  <p className="small-text text-muted-foreground">{mockData.currentClass.time}</p>
                  <p className="small-text text-muted-foreground">{mockData.currentClass.room}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleMarkAttendance('present')}
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Present
                  </Button>
                  <Button 
                    onClick={() => handleMarkAttendance('absent')}
                    variant="outline"
                    className="flex-1 border-error text-error hover:bg-error hover:text-error-foreground"
                  >
                    Absent
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="body-text text-muted-foreground">No class running</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="card-base lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.attendanceStats.map((stat) => (
                <div key={stat.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="body-text font-medium">{stat.subject}</span>
                    <span className="small-text text-muted-foreground">
                      {stat.present}/{stat.total} classes
                    </span>
                  </div>
                  <ProgressBar
                    value={stat.percentage}
                    variant={stat.percentage >= 90 ? 'success' : stat.percentage >= 80 ? 'primary' : 'warning'}
                    showLabel
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card className="card-base">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.upcomingClasses.map((cls, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    cls.isNext ? 'bg-primary/10 border border-primary/20' : 'bg-muted'
                  }`}
                >
                  <div>
                    <p className="body-text font-medium">{cls.subject}</p>
                    <p className="small-text text-muted-foreground">{cls.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="body-text font-medium">{cls.time}</p>
                    {cls.isNext && (
                      <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Next
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card className="card-base">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Recent Notes
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.recentNotes.map((note) => (
                <div key={note.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                  <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="body-text font-medium truncate">{note.title}</p>
                    <p className="small-text text-muted-foreground">{note.subject} • {note.date}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                View All Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;