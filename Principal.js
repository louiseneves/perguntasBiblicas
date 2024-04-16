import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon,Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {database, collection,getDocs,deleteDoc,doc,auth,where} from './firebase';
import { Logout,getLoggedInUserUid } from './auth';
import { query } from 'firebase/firestore';
 
const Principal = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [indicePergunta, setIndicePergunta] = useState(0);
  const [exibindoResposta, setExibindoResposta] = useState(false);
   
  console.group('TelaPrincipal renderizada');
  console.log('Estado atual:', { exibindoResposta, indicePergunta, perguntas });
  console.groupEnd();
  useEffect(() => {
    carregarPerguntas();
    console.log('useEffect sendo executado');
  }, []);

  const carregarPerguntas = async () => { 
    const user = auth.currentUser;
    if (!user) {
      console.error('Nenhum usuário autenticado.');
      return;
    } 
    const questionsRef = collection(database, 'perguntas');
const userQuestionsQuery = query (questionsRef,where('userId', '==',user.uid));

    //const querySnapshot = await getDocs(collection(database,'perguntas'));
     // const userQuestionsQuery = querySnapshot.where('userId', '==', userUid);
    try {
      
      console.log('Iniciando carregarPerguntas');
      const querySnapshot = await getDocs(userQuestionsQuery);
     
        // Faça algo com o UID, como consultar perguntas associadas a esse usuário
        // ...
        const list =  querySnapshot.docs.map((doc) => 
      ({id: doc.id,
        ...doc.data()}) 
          )
        const shuffledQuestions = shuffleArray(list);
      // Retorne um número específico de perguntas aleatórias
      setPerguntas(shuffledQuestions);
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error);
    return [];
  }
};
// Função para embaralhar um array (opcional)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
// Exemplo de uso 
 // Busca 5 perguntas aleatórias
  const exibirResposta = () => {
    setExibindoResposta(true);
  };

  const exibirPergunta = () => {
    setExibindoResposta(false);
  };

  const avancarPergunta = () => {
    if (indicePergunta < perguntas.length - 1) {
      setIndicePergunta(indicePergunta + 1);
      setExibindoResposta(false);
    }
  };

  const voltarPergunta = () => {
    if (indicePergunta > 0) {
      setIndicePergunta(indicePergunta - 1);
      setExibindoResposta(false);
    }
  };

  const apagarPergunta = async () => {
    try {
      const perguntaId = perguntas[indicePergunta]?.id;
      if (!perguntaId) {
        console.warn('ID da pergunta não encontrado.');
        return;
      }
      const perguntaRef = doc(database, 'perguntas', perguntaId);
      await deleteDoc(perguntaRef);
      // Recarregar as perguntas após a exclusão
      carregarPerguntas();
    } catch (error) {
      console.error('Erro ao excluir pergunta:', error);
    }
  };
  const handleCriarPress = async () => {
    const carregar = await carregarPerguntas();
    navigation.navigate('Cadastro', { carregar });
  };
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems:'center',
    justifyContent: 'flex-start', backgroundColor:'white',
    elevation:4,paddingHorizontal:20}}>
      <Text style={{fontSize:20,padding:20}} onPress={Logout}>Logout</Text>
    </View>
      <Text style={styles.texto}>Perguntas Bíblicas</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Button icon={<Icon name='chevron-left'color="white"/>} buttonStyle={{display:'flex', 
    flexDirection:'row',backgroundColor:"#8907e6",marginTop:10,marginStart:14,borderRadius:20,width:62,padding:8}} style={styles.voltar} onPress={voltarPergunta} disabled={indicePergunta === 0} />
      <Button style={styles.avancar} icon={<Icon name='chevron-right'color="white"/>} buttonStyle={{backgroundColor:"#8907e6",marginTop:10,marginEnd:14,borderRadius:20,width:62,padding:8}} onPress={avancarPergunta} disabled={indicePergunta === perguntas.length - 1 || perguntas.length === 0}  /> 
      </View>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {!exibindoResposta ? (
      <Text style={styles.texto}>{perguntas[indicePergunta]?.pergunta}</Text>
      ):
       (
        <Text style={styles.texto}>{perguntas[indicePergunta]?.resposta}</Text>
      )}
        </View>
      <View style={{ flexDirection: 'row',
    justifyContent: 'space-around', 
    paddingHorizontal: 16, marginTop:'auto',padding:10}}>
      {!exibindoResposta ?(
        <Button title='Resposta' buttonStyle={styles.buttonStyle} onPress={exibirResposta} />
      ):(
        <Button title='Pergunta' buttonStyle={styles.buttonStyle} onPress={exibirPergunta} />)
}

<Button title='Criar'buttonStyle={styles.buttonStyle} onPress={()=> {navigation.navigate('Cadastro', { carregar:carregarPerguntas })}}/>
        <Button icon={<Icon name='delete'color="white"/>}buttonStyle={styles.buttonStyle} onPress={apagarPergunta}/>
        </View>
      <StatusBar barStyle={'dark-content'} />
    </View>
    
  );
}
export default Principal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position:'relative',
  },
  texto:{
    fontSize:30,
    fontWeight: 'bold',
    padding:20, 
    textAlign:'center',
  },
  buttonStyle: {
    backgroundColor: "#8907e6",
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 21,
  },
  
});
