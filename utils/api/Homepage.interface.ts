interface Image {
  id: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
  };
}

interface YoutubeVideo {
  Title: string;
  view_url: string;
}

interface Card {
  id: number;
  Title: string;
  Location: string;
  Description: string;
  Image?: Image;
  Icon?: Image;
  googlemap_url?: string;
}

interface Employee {
  Name: string;
  Position: string | null;
  Image: Image;
}

interface Data {
  id: number;
  documentId: string;
  Why_choosing_title: string;
  Why_choosing_description: string;
  Solution_title: string;
  Solution_description: string;
  Employee_introduction_title: string;
  Location_title: string;
  Location_description: string;
  Services_title: string;
  Why_choosing_cards: Card[];
  Solution_card: Card[];
  Hero_section_image: Image;
  Mobile_hero_section_image: Image;
  Employees: Employee[];
  services_content: Card[];
  Location_card: Card[];
  Review: YoutubeVideo[];
}

interface HomepageRespone {
  data: Data;
}
