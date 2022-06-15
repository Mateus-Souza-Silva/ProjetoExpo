import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity } from "react-native";
import firebase from "./src/firebaseConnection";


export default function Login({ changeStatus }) {
    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (type === 'login') {
            // Aqui fazemos o login
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid)
                })
                .catch((err) => {
                    console.log(err);
                    alert('Login e/ou senha Inválidos ou não cadastrados');
                    return;
                })
        } else {
            // Aqui cadastramos o usuario 
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user.uid)
                })
                .catch((err) => {
                    console.log(err);
                    alert('Erro ao cadastrar! Verifique dados informados');
                    return;
                })
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.tituloView}>
                <Text style={styles.tituloText}>Login</Text>
            </View>
            <View style={styles.input}>
                <Text>Login:</Text>
                <TextInput
                    style={styles.textInputStyle}
                    textContentType="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Login"
                />
                <Text>Senha:</Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="**************"
                    textContentType="password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    text
                />
            </View>
            <TouchableOpacity
                    style={[styles.handleLogin,
                    { backgroundColor: type === 'login' ? '#3ea6f2' : '#B7B7B7', borderRadius: 20, textAlign: 'center', height:30, padding:5}]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginText}>
                        {type === 'login' ? 'Acessar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
                    <Text style={{ textAlign: 'center', }}>
                        {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
                    </Text>
                </TouchableOpacity>
                
        </SafeAreaView>
          
    );
}

const styles = StyleSheet.create({
    TouchableOpacity:{
        
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stilo: {
        backgroundColor: '#ffffff'
    },
    input: {
        justifyContent: 'top',
        alignItems: 'left',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
    },
    textInputStyle: {
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    tituloView: {
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 10
    },
    tituloText: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
    },
    botao: {
        justifyContent: 'top',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20
    },
    lanche: {
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        key: 2
    }

});

