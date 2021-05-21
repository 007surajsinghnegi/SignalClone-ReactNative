import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button , Input , Text} from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back"
        });
    }, [navigation]);

    const register = () => {

        auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL : imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            })
            .catch(error=>alert(error.message));
        
        
    }
  
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom:50}}>
                Create A Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />
                 <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                 <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                />
                 <Input
                    placeholder="Profile Picture URl (Optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text)=>setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View> 
            <Button containerStyle={styles.button} onPress={register} raised title="Register"/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
    }

})
