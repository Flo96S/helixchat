export class Message {
   chatid: number;
   id: number;
   text: string;
   time: Date;
   userhash: string;
   usernickname: string;
   imageid: string;

   constructor(chatid: number, id: number, text: string, time: string, userhash: string, usernickname: string, imageid: string) {
      this.chatid = chatid;
      this.id = id;
      this.text = text;
      this.time = this.parseTime(time) || new Date();
      this.userhash = userhash;
      this.usernickname = usernickname;
      this.imageid = imageid;
   }

   parseTime(datetime: string): Date | null {
      const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})$/;
      const match = datetime.match(dateTimeRegex);

      if (!match) {
         console.error("Invalid date-time string format");
         return null;
      }

      const [, year, month, day, hour, minute, second] = match.map(Number);
      // Months are 0-indexed in JavaScript's Date, so we subtract 1 from the month
      return new Date(year, month - 1, day, hour, minute, second);
   }
}