import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CadastrosLogin } from "./auth";
const CadastroLogin = ({navigation})=>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const handleOnSubmit = () => {
        if(email!=''&& senha!=''&& confirmaSenha!=''){
            if(senha==confirmaSenha){
                CadastrosLogin(email,senha);
            }else{
                Alert.alert('A senha não correspondeu');
            }
        }
    }
    return(
        <View style={styles.container}>
            <Text style = {styles.titulo}>Cadastro de Usuário</Text>
            <View style = {styles.view}>
                <Text>Email</Text>
                <TextInput style = {styles.email} onChangeText={value =>setEmail(value)}
                value={email} keyboardType="email-address"/>
            </View>
            <View style = {styles.view}>
                <Text>Senha</Text>
                <TextInput style = {styles.email} onChangeText={value =>setSenha(value)}
                value={senha} secureTextEntry={true}/>
                </View>
                <View style = {styles.view}>
                <Text>Confirma Senha</Text>
                <TextInput style = {styles.email} onChangeText={value =>setConfirmaSenha(value)}
                value={confirmaSenha} secureTextEntry={true}/>
                <TouchableOpacity style={styles.botao} onPress={handleOnSubmit}>
                    <Text style={styles.btxt}>Cadastrar</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text>Já tenho uma conta?</Text>
                <Text style={styles.ftxt} onPress={()=>navigation.navigate('Login')}>Login</Text>
            </View>
        </View>
    );
}
export default CadastroLogin;
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        padding:20
    },
    titulo:{
        fontSize:24,
        fontWeight:'bold',
        marginVertical:32
    },
    view:{
        width:'100%',
        marginBottom:20
    },
    email:{
        padding:10,
        borderColor:'black',
        borderWidth:1,
        width:'100%',
        borderRadius:5,
        marginTop:10
    },
    botao:{
        width:'100%',
        paddingVertical:10,
        backgroundColor:"#8907e6",
        borderWidth:1,
        borderRadius:5,
        marginTop:20
    },
    btxt:{
        textAlign:'center',
        fontSize:18,
        color:"white"
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20
    },
    ftxt:{
        marginLeft:4
    }
})