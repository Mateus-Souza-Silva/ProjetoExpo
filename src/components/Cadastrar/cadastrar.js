import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import firebase from '../../firebaseConnection';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import Listagem from '../../components/Listar/listagem';

console.disableYellowBox = true;

export default function App() {
    const [descricao, setDescricao] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [vista, setVista] = useState('');
    const [prazo, setPrazo] = useState('');

    const [lanches, setLanches] = useState([]);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);
    const [key, setKey] = useState('');

    useEffect(() => {
        async function dados() {
            await firebase.database().ref('lanches').on('value', (snapshot) => {
                setLanches([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        descricao: chilItem.val().descricao,
                        tamanho: chilItem.val().tamanho,
                        vista: chilItem.val().vista,
                        prazo: chilItem.val().prazo,
                    };
                    setLanches(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        dados();
    }, []);

    async function cadastrar() {
        if (descricao !== '' & tamanho !== '' & vista !== '' & prazo !== '' & key !== '') {
            firebase.database().ref('lanches').child(key).update({
                descricao: descricao, tamanho: tamanho, vista: vista, prazo: prazo,
            })
            Keyboard.dismiss();
            limparDados();
            setKey('');
            return;
        }
        let lanches = await firebase.database().ref('lanches');
        let chave = lanches.push().key;
        lanches.child(chave).set({
            descricao: descricao,
            tamanho: tamanho,
            vista: vista,
            prazo: prazo
        });
        alert('Lanche Cadastrado!');
        limparDados();
    }

    function handleDelete(key) {
        firebase.database().ref('lanches').child(key).remove()
            .then(() => {
                const findLanches = lanches.filter(item => item.key !== key)
                setLanches(findLanches)
            })
    }

    function handleEdit(data) {
        console.log(data),
            setKey(data.key),
            setDescricao(data.descricao),
            setTamanho(data.tamanho),
            setVista(data.vista),
            setPrazo(data.prazo)
    }

    function limparDados() {
        setDescricao('');
        setTamanho('');
        setVista('');
        setPrazo('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Descricao</Text>
            <TextInput
                placeholder='Descricao Produto'
                maxLength={40}
                left={<TextInput.Icon name="microwave" />}
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setDescricao(texto)}
                value={descricao}
                ref={inputRef}
            />

            <Text style={styles.texto}>tamanho</Text>
            <TextInput
                placeholder='Tamanho'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setTamanho(texto)}
                value={tamanho}
                ref={inputRef}
            />

            <Text style={styles.texto}>Valor à Vista R$</Text>
            <TextInput
                placeholder='0,00'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setVista(texto)}
                value={vista}
                ref={inputRef}
            />

            <Text style={styles.texto}>Valor à Prazo R$</Text>
            <TextInput
                placeholder='0,00'
                style={styles.input}
                underlineColorAndroid="transparent"
                onChangeText={(texto) => setPrazo(texto)}
                value={prazo}
                ref={inputRef}
            />

            <TouchableOpacity onPress={cadastrar}
                style={styles.button}
                activeOpacity={0.5}>
                {/* <Image
          source={require('../images/save.png')}
          style={styles.buttonImageIconStyle}
        /> */}
                <View style={styles.buttonIconSeparatorStyle} />
                <Text style={styles.buttonTextStyle}>
                    Enviar
                </Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.listar}>Listagem de Produtos</Text>
            </View>
            {loading ?
                (
                    <ActivityIndicator color="#121212" size={45} />
                ) :
                (
                    <FlatList
                        keyExtractor={item => item.key}
                        data={lanches}
                        renderItem={({ item }) => (
                            <Listagem data={item} deleteItem={handleDelete}
                                editItem={handleEdit} />
                        )}
                    />
                )
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },

    texto: {
        fontSize: 15,
    },

    input: {
        marginBottom: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#121212',
        height: 30,
        fontSize: 15,
        borderRadius: 10
    },

    icon: {
        position: 'absolute',
        right: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 100,
        fontSize: 20
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 5,
        height: 40,
    }
});