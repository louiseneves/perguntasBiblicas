import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Logins } from "./auth";
const Login = ({navigation})=>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const handleOnSubmit = () => {
        if(email!=''&& senha!=''){
            Logins(email,senha);
        }
    }
    return(
        <View style={styles.container}>
            <Text style = {styles.titulo}>Login</Text>
            <View style = {styles.view}>
                <Text>Email</Text>
                <TextInput style = {styles.email} onChangeText={value =>setEmail(value)}
                value={email} keyboardType="email-address"/>
            </View>
            <View style = {styles.view}>
                <Text>Senha</Text>
                <TextInput style = {styles.email} onChangeText={value =>setSenha(value)}
                value={senha} secureTextEntry={true}/>
                <TouchableOpacity style={styles.botao} onPress={handleOnSubmit}>
                    <Text style={styles.btxt}>Enviar</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text>Eu não tenho uma conta?</Text>
                <Text style={styles.ftxt} onPress={()=>navigation.navigate('CadastroLogin')}>Criar conta</Text>
            </View>
        </View>
    );
}
export default Login;
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
        color:"white",
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20
    },
    ftxt:{
        marginLeft:4,
        color:'red',
    }
})
    