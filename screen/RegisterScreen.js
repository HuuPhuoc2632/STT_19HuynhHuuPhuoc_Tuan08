import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
    const navigaton = useNavigation()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const checkPassword = () => {
        if (password == confirmPassword) {
            return true
        }
        return false
    }
    const checkUserName = () => {
        if (userName == '') {
            return false
        }
        return true
    }
    const goToLogin = () => {
        navigaton.navigate('Login')
    }
    const userInfo ={
        userName: userName,
        password: password
    }
    const register =() => {
        fetch('https://654882d5dd8ebcd4ab22fb7b.mockapi.io/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // Send your data in the request body as JSON
            body: JSON.stringify(userInfo),

        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            goToLogin()
        }).catch(error => {
            alert(error)
        })
    };




    return (
        <LinearGradient
            colors={["#9620ab", "#3238a8",]}
            style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
        >
            <Ionicons
                name="person-circle-sharp"
                size={120}
                style={{ color: "white" }}
            />
            <Text style={styles.title}>Register</Text>
            <View style={styles.wrapperUser}>
                <Ionicons
                    name="md-person-outline"
                    size={20}
                    style={{ color: "white", margin: 10 }}
                />
                <TextInput placeholder="User name" placeholderTextColor="white" style={{ height: '100%', width: '100%' }} onChangeText={setUserName} />
            </View>
            <View style={styles.wrapperUser}>
                <Ionicons
                    name="md-key-outline"
                    size={20}
                    style={{ color: "white", margin: 10 }}
                />
                <TextInput placeholder="Password" secureTextEntry={!showPassword} placeholderTextColor="white" style={{ height: '100%', width: '100%' }} onChangeText={setPassword} />
                <TouchableOpacity onPress={toggleShowPassword}
                    style={{ position: 'absolute', right: 20 }}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.wrapperUser}>
                <Ionicons
                    name="md-key-outline"
                    size={20}
                    style={{ color: "white", margin: 10 }}
                />
                <TextInput placeholder="Confirm password" secureTextEntry={!showPassword} placeholderTextColor="white" style={{ height: '100%', width: '100%' }} onChangeText={setConfirmPassword} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={register}>
                <Text style={styles.title}>Register</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15, color: 'white'}}>You have already account? </Text>
                <TouchableOpacity onPress={goToLogin}>
                    <Text style={{fontSize: 15, color: 'cyan', textDecorationLine: 'underline'}}>Login</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    wrapperUser: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginVertical: 10,
        paddingVertical: 5,
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 20,
    },
    btn: {
        backgroundColor: "cyan",
        width: "80%",
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 70,

    }
})