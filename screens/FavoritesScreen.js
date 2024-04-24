import { useSelector } from "react-redux";
import {View, FlatList, Text} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const FavoritesScreen = ({navigation}) => {
const {campsitesArray, isLoading, errMess} = useSelector((state) => state.campsites);
const favorites = useSelector((state) => state.favorites);

}




export default FavoritesScreen;