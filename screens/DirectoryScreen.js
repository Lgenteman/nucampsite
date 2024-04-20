import { useState } from "react";
import {CAMPSITES} from '../shared/campsites';
import { FlatList, Text, View } from "react-native";
import {Avatar, ListItem} from 'react-native-elements';
import Loading from "../components/LoadingComponent";

const DirectoryScreen = ({navigation}) => {
    const campsites = useSelector((state) => state.campsites);

    if (campsites.isLoading) {
        return <Loading />;
    }
    if (campsites.errMess) {
        return (
            <view>
                <Text>{campsites.errMess}</Text>
            </view>
        );
    }
    const renderDirectoryItem = ({item: campsite}) => {
        return(
            <ListItem onPress={() => navigation.navigate('CampsiteInfo', {campsite})}>
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

return(
    <FlatList
    data={campsites}
    renderItem={renderDirectoryItem}
    keyExtractor={(item) => item.id.toString()}
    />
);

};

export default DirectoryScreen;