// MembresScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MembresScreen = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editedMemberName, setEditedMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim() === '') return;
    const newMember = {
      id: Date.now(),
      name: newMemberName.trim(),
    };
    setMembers([...members, newMember]);
    setNewMemberName('');
  };

  const handleDeleteMember = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
  };

  const handleEditMember = (memberId) => {
    setEditingMemberId(memberId);
    const memberToEdit = members.find((member) => member.id === memberId);
    if (memberToEdit) {
      setEditedMemberName(memberToEdit.name);
    }
  };

  const handleSaveEditedMember = () => {
    const updatedMembers = members.map((member) => {
      if (member.id === editingMemberId) {
        return { ...member, name: editedMemberName.trim() };
      }
      return member;
    });
    setMembers(updatedMembers);
    setEditingMemberId(null);
    setEditedMemberName('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.membersContainer}>
        {members.map((member) => (
          <View key={member.id} style={styles.member}>
            {editingMemberId === member.id ? (
              <TextInput
                style={styles.editInput}
                value={editedMemberName}
                onChangeText={setEditedMemberName}
                onBlur={handleSaveEditedMember}
                autoFocus
              />
            ) : (
              <Text style={styles.memberName}>{member.name}</Text>
            )}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => handleDeleteMember(member.id)}>
                <Feather name="trash-2" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEditMember(member.id)}>
                <Feather name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom du membre"
          value={newMemberName}
          onChangeText={setNewMemberName}
        />
      </View>
      <TouchableOpacity style={styles.inviteButton} onPress={handleAddMember}>
        <Text style={styles.inviteButtonText}>Inviter les membres</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  membersContainer: {
    flexGrow: 1,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  memberName: {
    fontSize: 16,
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  inviteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MembresScreen;
