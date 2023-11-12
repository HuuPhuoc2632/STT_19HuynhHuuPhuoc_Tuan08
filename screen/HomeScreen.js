import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import NoteComponent from '../component/NoteComponent';
import AddNoteModal from '../component/AddNoteModal';

const HomeScreen = (props) => {
    const { user } = props.route.params
    console.log(user);
    const [notes, setNotes] = useState([])
    const [visible, setVisible] = useState(false);
    const addNewNodeModal = () => {
        setVisible(true);
    }
    const hideModal = () => {
        setVisible(false);
    
    }
    useEffect(() => {
        refresh()
    }, [])
    const refresh = () => {
        console.log(user.id);
        const url = new URL('https://654882d5dd8ebcd4ab22fb7b.mockapi.io/notes');
        url.searchParams.append('userId', user.id);
        fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(notes => {
            setNotes(notes)
            // Do something with the list of tasks
        }).catch(error => {
            // handle error
        })
    }
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Note App</Text>
                <TouchableOpacity onPress={addNewNodeModal}>
                    <Ionicons name='add-circle-outline' size={45}
                        style={{ margin: 10, color: 'blue' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={{width:'100%'}}>
                    <FlatList
                        data={notes}
                        renderItem={({ item }) => <NoteComponent item={item} refresh={refresh} />}
                        numColumns={1}
                        style={{ marginHorizontal: 10 }}
                    />
                </View>
            </View>
            <AddNoteModal visible={visible} onClose={hideModal} userId={user.id} refresh={refresh}/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 20,
    },
    body: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})