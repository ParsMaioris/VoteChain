class Referendum {
  id: string;
  title: string;
  description: string;
  endDate: string;
  imageUrl: string;
  details: string;
  userVote: 'yes' | 'no' | null;
  userHasVoted: boolean;

  constructor(id: string, title: string, description: string, endDate: string, imageUrl: string,
      details: string, userVote: 'yes' | 'no' | null, userHasVoted: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.endDate = endDate;
    this.imageUrl = imageUrl;
    this.details = details;
    this.userVote = userVote;
    this.userHasVoted = userHasVoted;
  }
}

export default Referendum;
