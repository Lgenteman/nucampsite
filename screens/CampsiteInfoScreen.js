import {FlatList, StyleSheet, Text, View, Button, Modal} from 'react-native';
import {Input, Rating, Icon} from 'react-native-elements';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import {postComment} from '../features/comments/commentsSlice';




const CampsiteInfoScreen = ({route}) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    
    const handleSubmit = async () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        try {
        await dispatch(postComment(newComment));
        setShowModal(false);
    } catch (error) {
        console.error('Error submitting comment:', error);
    }
    };
    const resetForm = () => {
        setRating(5);
        setAuthor("");
        setText("")
    };

    const renderCommentItem = ({item}) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating
                    style={{
                        imageSize: 10,
                        alignItems: 'flex-start',
                        paddingVertical: '5%'
                    }}
                    startingValue={item.rating}
                    readonly
                    />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };
    return (
        <>
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id)}
            renderItem={renderCommentItem}
            KeyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{marginHorizontal: 20, paddingVertical: 20}}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        campsite={campsite}
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                        onShowModal={() => setShowModal(!showModal)}
                />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }       
        />
        <Modal
            animationType='slide'
            transparent={false}
            visible={showModal}
            onRequestClose={() => setShowModal(!showModal)}
        >
            <View style={styles.modal}>
                <Rating
                    showRating
                    startingValue={rating}
                    imageSize={40}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{paddingVertical: 10}}    
                />
                <Input
                    placeholder='Author'
                    leftIconContainerStyle={{paddingRight: 10}}
                    leftIcon={<Icon name='user-o' type='font-awesome' />}
                    onChangeText={(text) => setAuthor(text)}
                />
                <Input
                    placeholder='Comment'
                    leftIconContainerStyle={{paddingRight: 10}}
                    leftIcon={<Icon name='comment-o' type='font-awesome' />}
                    onChangeText={(text) => setText(text)}
                />
                <View style={{margin: 10}}>
                    <Button
                        color='#5637DD'
                        title='Submit'
                        onPress={() => {
                            handleSubmit();
                            resetForm();
                        }}
                    />
                </View>
                <View style={{margin: 10}}>
                    <Button
                        onPress={() => {
                            setShowModal(!showModal);
                            resetForm();
                        }}
                        color='#808080'
                        title='Cancel'
                    />
                </View>
            </View>
        </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;