import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button,Input } from 'react-native-elements';
import {database,collection,addDoc, auth } from './firebase';

const Cadastro = ({navigation,route}) => {
    const [pergunta,setPergunta] = useState('');
    const [resposta,setResposta] = useState('');
     
    
    const handleInputChange = (novoTexto) => {
        setPergunta(novoTexto);
      };
      const handleInputResposta = (novoResposta) => {
        setResposta(novoResposta);
      };
      const salvarDados = async () => {     
        try {   
          const user = auth.currentUser;
          if (!user) {
            console.error('Nenhum usuário autenticado.');
            return;
          }
          if (pergunta.trim() === '' || resposta.trim() === '') {
            console.error("Os campos de pergunta e resposta não podem estar vazios.");
            return;
        }       
            await addDoc(collection(database, "perguntas"),{
            // Adicione à coleção "perguntas"
                pergunta:pergunta,
                resposta:resposta,
                userId: user.uid,
            });
            route.params.carregar();
            navigation.goBack();         
            console.log("Dados salvos com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
        }
       
    };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Cadastro</Text>
      </View>
      <Text style={styles.texto}>Pergunta</Text>
      <Input onChangeText={handleInputChange} value={pergunta}  />
      <Text style={styles.texto}>Resposta</Text>
      <Input onChangeText={handleInputResposta} value={resposta} />
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Button title='Cancelar'buttonStyle={{backgroundColor:"#8907e6",marginTop:10,marginStart:4,borderRadius:20,width:100,padding:8}} onPress={()=>navigation.navigate('Principal')}/>
        <Button title='Salvar'buttonStyle={{backgroundColor:"#8907e6",marginTop:10,marginEnd:14,borderRadius:20,width:100,padding:8,marginStart:4}} onPress={()=>{salvarDados()}}/>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}
export default Cadastro;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  texto:{
    fontSize:30,
    fontWeight: 'bold',
    padding:20,  
  },
  titulo:{
    fontSize:30,
    fontWeight: 'bold',
    padding:20,  
    textAlign:'center'
  }
});
