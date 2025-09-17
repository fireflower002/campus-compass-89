import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NoteCard from '@/components/ui/note-card';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3x3, 
  List,
  BookOpen,
  FileText
} from 'lucide-react';

// Mock notes data
const mockNotes = [
  {
    id: '1',
    title: 'Calculus - Derivatives and Applications',
    content: 'Detailed notes on derivatives, chain rule, product rule, and quotient rule. Including examples and practice problems for better understanding of the concepts.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:22:00Z',
    subject: 'Mathematics',
    attachments: [
      { id: '1', name: 'derivative-formulas.pdf', type: 'application/pdf', url: '#' },
      { id: '2', name: 'practice-problems.png', type: 'image/png', url: '#' },
    ]
  },
  {
    id: '2',
    title: 'Quantum Physics - Wave-Particle Duality',
    content: 'Comprehensive study notes on the wave-particle duality concept, including historical experiments, mathematical foundations, and modern applications in quantum mechanics.',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    subject: 'Physics',
    attachments: [
      { id: '3', name: 'double-slit-experiment.jpg', type: 'image/jpeg', url: '#' },
    ]
  },
  {
    id: '3',
    title: 'Organic Chemistry - Reaction Mechanisms',
    content: 'Study guide covering major organic reaction mechanisms including nucleophilic substitution, elimination reactions, and electrophilic aromatic substitution.',
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-13T15:10:00Z',
    subject: 'Chemistry',
    attachments: []
  },
  {
    id: '4',
    title: 'Data Structures - Binary Trees',
    content: 'Complete notes on binary trees, including implementation, traversal algorithms (inorder, preorder, postorder), and common operations like insertion and deletion.',
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T17:20:00Z',
    subject: 'Computer Science',
    attachments: [
      { id: '4', name: 'tree-traversal-code.js', type: 'application/javascript', url: '#' },
      { id: '5', name: 'binary-tree-diagram.png', type: 'image/png', url: '#' },
    ]
  },
  {
    id: '5',
    title: 'Linear Algebra - Matrix Operations',
    content: 'Fundamental matrix operations including addition, multiplication, determinants, and inverse matrices. Includes examples and real-world applications.',
    createdAt: '2024-01-11T13:45:00Z',
    updatedAt: '2024-01-11T16:30:00Z',
    subject: 'Mathematics',
    attachments: []
  },
  {
    id: '6',
    title: 'Thermodynamics - First Law',
    content: 'Detailed explanation of the first law of thermodynamics, energy conservation, heat engines, and practical applications in engineering systems.',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T12:15:00Z',
    subject: 'Physics',
    attachments: [
      { id: '6', name: 'heat-engine-diagram.pdf', type: 'application/pdf', url: '#' },
    ]
  }
];

const Notes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science'];
  
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleEditNote = (noteId: string) => {
    console.log('Edit note:', noteId);
    // Handle note editing
  };

  const handleDeleteNote = (noteId: string) => {
    console.log('Delete note:', noteId);
    // Handle note deletion
  };

  const handleCreateNote = () => {
    console.log('Create new note');
    // Handle note creation
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-xl">Notes</h1>
          <p className="body-text text-muted-foreground">
            Organize and manage your study notes
          </p>
        </div>
        <Button onClick={handleCreateNote}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="card-base">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Subject Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-base">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="heading-md">{filteredNotes.length}</p>
            <p className="small-text text-muted-foreground">
              {searchTerm || selectedSubject !== 'All' ? 'Filtered Notes' : 'Total Notes'}
            </p>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="heading-md">{subjects.length - 1}</p>
            <p className="small-text text-muted-foreground">Subjects</p>
          </CardContent>
        </Card>

        <Card className="card-base">
          <CardContent className="p-4 text-center">
            <Plus className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="heading-md">
              {mockNotes.reduce((acc, note) => acc + note.attachments.length, 0)}
            </p>
            <p className="small-text text-muted-foreground">Attachments</p>
          </CardContent>
        </Card>
      </div>

      {/* Notes Grid/List */}
      {filteredNotes.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredNotes.map((note) => (
            <div key={note.id} className={viewMode === 'list' ? 'w-full' : ''}>
              <NoteCard
                id={note.id}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                attachments={note.attachments}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            </div>
          ))}
        </div>
      ) : (
        <Card className="card-base">
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="heading-lg mb-2">No notes found</h3>
            <p className="body-text text-muted-foreground mb-6">
              {searchTerm || selectedSubject !== 'All' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by creating your first note'
              }
            </p>
            <Button onClick={handleCreateNote}>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notes;