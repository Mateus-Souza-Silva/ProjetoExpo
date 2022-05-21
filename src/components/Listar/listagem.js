import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



export default function Listagem({ data, deleteItem, editItem }) {

    /*const [lanches, setLanches] = useState([]);
    const [loaging, setLoading] = useState(true);

    useEffect(() => {

        //listar dados ao cadastrar
        async function dados() {
            await firebase.database().ref('lanches').on('value', (snapshot) => {
                setLanches([]);

                snapshot.forEach((chilItem) => {
                    let data ={
                        key: chilItem.key,
                        descricao: chilItem.val().descricao,
                        tamanho: chilItem.val().tamanho,
                        vista: chilItem.val().vista,
                        prazo: chilItem.val().prazo
                    };

                    setLanches(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        dados();
    }, []);*/

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lanche: {data.descricao}</Text>
            <Text style={styles.text}>Tamanho: {data.tamanho}</Text>
            <Text style={styles.text}>Valor à Vista(R$): {data.vista}</Text>
            <Text style={styles.text}>Valor à Prazo: {data.prazo}</Text>

            <View style={styles.item}>
                <TouchableOpacity onPress={() => deleteItem(data.key)}>
                    <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editItem(data)}>
                    <Icon name="create" color="blue" size={20}>Editar</Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#FAFAD2',
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Arial'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});