import { ACTION_TYPE_UPDATE_DATA } from 'config';

const DEFAULT_STATE = {
  businesses: [
    {
      id: 1,
      name: 'Pete\'s Coffee',
      image:
        'https://img.theculturetrip.com/x/smart/wp-content/uploads/2018/02/coffee-3120750_1280-1.jpg',
    },
    {
      id: 2,
      name: 'Tastebuds',
      image:
        'https://media-cdn.tripadvisor.com/media/photo-s/07/e3/f6/8d/chocolate-cafe.jpg',
    },
    {
      id: 3,
      name: 'SFO Bakeries',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSe-F7SYNAH2Hr2oLEdnygNRPZvQYD2CiQ9AvKNZB6H9AL2th4&usqp=CAU',
    },
    {
      id: 4,
      name: 'The Temple Bar',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNU6TVcyVq16CovYsknkWpale5iqumYURRe7F7D5igl6V_9NsN&usqp=CAU',
    },
  ],
  donations: new Array(4).fill(0).map(() => Math.floor(Math.random() * 100)),
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE_UPDATE_DATA: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};
