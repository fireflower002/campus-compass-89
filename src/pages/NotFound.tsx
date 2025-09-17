import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="card-base max-w-md w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h1 className="heading-xl mb-2">404</h1>
          <h2 className="heading-lg mb-4">Page Not Found</h2>
          <p className="body-text text-muted-foreground mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
