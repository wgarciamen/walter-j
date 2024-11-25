export interface NavItem {
        icon: React.ComponentType;
        text: string;
        active?: boolean;
      }
      
      export interface StatCardProps {
        icon: React.ComponentType;
        title: string;
        value: string;
        trend: number;
      }
      
      export interface Activity {
        user: string;
        action: string;
        time: string;
        avatar: string;
      }
      
      export interface SearchHeaderProps {
        searchQuery: string;
        setSearchQuery: (query: string) => void;
      }