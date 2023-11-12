import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-web'
import { Ionicons } from '@expo/vector-icons'
import EditNoteModal from './EditNoteModal'

const NoteComponent = (props) => {
  const { item, refresh } = props
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleDelete = () => {
    if (confirm('Bạn có chắc chắn muốn xóa ghi chú này không?')) {
      fetch(`https://654882d5dd8ebcd4ab22fb7b.mockapi.io/notes/${item.id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          // handle error
        }).then(task => {
          refresh()
          // Do something with deleted task
        }).catch(error => {
          // handle error
        })
    }
  }
  return (
    <View>
      <View style={[styles.container, { backgroundColor: `${item.important}` }]}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 }}>{item.content}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', marginLeft: 10 }}>{item.time}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={showModal}>
            <Ionicons name='pencil-outline' size={30} color={'white'} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name='remove-circle-sharp' size={30} color={'white'} style={{ margin: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <EditNoteModal item={item} visible={visible} onClose={hideModal} refresh={refresh} />
    </View>
  )
}

export default NoteComponent

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})