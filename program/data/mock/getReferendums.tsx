import Referendum from "../../domain/Referendum";

const mockReferendums: any[] = [
    {
      id: 'ref-001',
      title: 'Infrastructure Referendum',
      description: 'Vote on a proposed tax reform that aims to fund public infrastructure improvements and social welfare programs.',
      endDate: '2023-12-31',
      imageUrl: 'https://images.pexels.com/photos/103596/pexels-photo-103596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      details: 'The proposed tax reform for funding public infrastructure improvements and social welfare programs may enhance essential services but could also impose financial burdens on individuals and businesses.',
      userVote: null,
      userHasVoted: false
    },
    {
      id: 'ref-002',
      title: 'Education Referendum',
      description: 'Support or reject a proposal to increase funding for public education, including enhancing educational resources and teacher salaries.',
      endDate: '2024-06-30',
      imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      details: 'The referendum to increase funding for public education offers the potential for enhanced resources and teacher salaries but rejecting it may hinder educational quality and teacher retention.',
      userVote: null,
      userHasVoted: false
    },
    {
      id: 'ref-003',
      title: 'Healthcare Referendum',
      description: 'Cast your vote on a proposal designed to improve national healthcare services and patient care quality.',
      endDate: '2024-03-15',
      imageUrl: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      details: 'The proposal to enhance national healthcare services and patient care quality presents an opportunity for better healthcare, while rejecting it may perpetuate existing challenges and maintain the status quo.',
      userVote: null,
      userHasVoted: false
    },
  ];
  
  const getReferendums = (): Promise<Referendum[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockReferendums);
      }, 500); 
    });
  };
  
  export { getReferendums };