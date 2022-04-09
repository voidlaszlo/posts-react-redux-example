export default interface User {
  id: number;
  name: string;
  imageUrl: string;
  coverImageUrl: string;
  about: string;
  fields: Fields;
  href: string;
  friends: number[];
  photos: Photo[];
}

export interface Fields {
  Phone: string;
  Email: string;
  Relationship: string;
  Location: string;
  Birthday: string;
}

export interface Photo {
  source: string;
  title: string;
}
