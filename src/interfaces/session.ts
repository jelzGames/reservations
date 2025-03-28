
export type IRoom = {
  id: number,
  name: string,
  price: number,
  image: string,
};

export type IRental = {
  uuid: string,
  id: number;
  chekin: Date | null,
  cheout: Date | null,
  guests: number,
  price: number | undefined,
  nights: number,
  total: number
};

export type ISessionData = {
  sessionId: string;
  data: {
    rooms: IRoom[];
    rentals: IRental[];
  };
};
