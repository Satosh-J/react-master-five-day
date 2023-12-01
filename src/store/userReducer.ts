import { GET_USERS, GET_USERS_ASYNC } from "./actions";

const users = [
  {
    "id": 18,
    "first_name": "Cherlyn",
    "last_name": "Kleingrub",
    "email": "ckleingrubh@nps.gov",
    "phone": "915-736-0167",
  },
  {
    "id": 19,
    "first_name": "Stan",
    "last_name": "Aasaf",
    "email": "saasafi@gnu.org",
    "phone": "903-560-9509",
  },
  {
    "id": 20,
    "first_name": "Penelope",
    "last_name": "Raggitt",
    "email": "praggittj@mayoclinic.com",
    "phone": "563-943-2235",
  }
]

interface ActionType {
  type: string;
  payload: any; // Adjust the type according to your actual payload structure
}

type State = {
  selectedUser?: User,
  users: User[],
  totalCount: number
  isLoading: boolean
};

const initialState: State = {
  selectedUser: undefined,
  users: users,
  totalCount: 0,
  isLoading: false
};


const userReducer = (
  state = initialState,
  action: ActionType
) => {

  switch (action.type) {

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload
      }

    case GET_USERS_ASYNC.PENDING: {
      return {
        ...state,
        isLoading: true
      }
    }

    case GET_USERS_ASYNC.REJECTED: {
      return {
        ...state,
        isLoading: false
      }
    }
    case GET_USERS_ASYNC.FULFILLED:

      const response = action.payload

      const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);

      return {
        ...state,
        users: response.data,
        totalCount,
        isLoading: false
      }
    default:
      return state;
  }
};

export default userReducer