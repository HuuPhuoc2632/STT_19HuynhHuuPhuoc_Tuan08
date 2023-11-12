import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Modal} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'


const AddNoteModal = ({visible, onClose, userId, refresh}) => {
    const [content, setContent] = useState('')
    const [selected, setSelected] = React.useState("");
    const addNewNote = () => {
        const note = {
            content: content,
            userId: userId,
            important: selected,
            time: new Date().toLocaleString(),
        }
        fetch('https://654882d5dd8ebcd4ab22fb7b.mockapi.io/notes', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // Send your data in the request body as JSON
            body: JSON.stringify(note),

        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            refresh()
            onClose()
            // Do something with the returned task
        }).catch(error => {
            // handle error
        })
    }
    const data = [
        {key:'red', value:'Cao'},
        {key:'green', value:'Vừa'},
        {key:'pink', value:'Thấp'},

    ]
    console.log(selected);
  return (
    
    <Modal
    visible={visible}
    onDismiss={onClose}
    transparent={true}
    
   >
    <View style={styles.modal}>
        <View style={{alignItems: 'center',justifyContent:'center', width:'100%'}}>
            <TouchableOpacity onPress={onClose}>
                <Ionicons name='close-circle' size={34} color={'red'} style={{marginBottom:20}}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>Thêm ghi chú</Text>
        <TextInput value={content} onChangeText={setContent} style={styles.input} placeholder='Nội dung ghi chú' placeholderTextColor={'gray'}/>
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="key"
        placeholder='Mức độ quan trọng'
       
    />
        <TouchableOpacity onPress={addNewNote} style={styles.btn}>
            <Text style={{color: 'white', fontSize: 18, fontWeight:'bold'}}>Thêm</Text>
        </TouchableOpacity>
    </View>

   </Modal>

  )
}

export default AddNoteModal

const styles = StyleSheet.create({
    modal: {
        margin:'auto',
        width: '90%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'cyan',
    },
    btn: {
        width: 100,
        height: 50,
        backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: 'cyan',
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20,
    }
})