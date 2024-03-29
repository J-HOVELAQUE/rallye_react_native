import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar, Accessory, SocialIcon, Input } from 'react-native-elements';

import { FontAwesome } from '@expo/vector-icons';

// Rallye Colors
var redTa = '#E30613'
var whiteTa = '#FFFFFF'
var blackTa = '#000000'
var greyDarkTa = '#263238'
var greyLightTa = '#B1B6B7'
var icoWhite = '#FFFFFF'

/* ^^^^^^^^^^^^^^^^^^^^ BOUTONS ^^^^^^^^^^^^^^^^^^^^ */
// Bouton login
const RedButtonLogin = ({ onPress, title, backgroundColor }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.redButtonLogin, backgroundColor && { backgroundColor }]} activityOpacity={0.5}>
        <Text style={styles.redButtonText}>{title}</Text>
    </TouchableOpacity>;
}
// Bouton inactif
const RedButton = ({ onPress, title, backgroundColor }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.redButtonContainer, backgroundColor && { backgroundColor }]} activityOpacity={0.5}>
        <Text style={styles.redButtonText}>{title}</Text>
    </TouchableOpacity>;
}
// Bouton actif
const RedButtonOutline = ({ onPress, title, backgroundColor }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.redButtonContainerOutline, backgroundColor && { backgroundColor }]} activityOpacity={0.5}>
        <Text style={styles.redButtonTextOutline}>{title}</Text>
    </TouchableOpacity>;
}
// Bouton inactif
const GreyButton = ({ onPress, title, backgroundColor }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.greyButtonContainer, backgroundColor && { backgroundColor }]} activityOpacity={0.5}>
        <Text style={styles.greyButtonText}>{title}</Text>
    </TouchableOpacity>;
}
// Bouton actif
const GreyButtonOutline = ({ onPress, title, backgroundColor }) => {
    return <TouchableOpacity onPress={onPress} style={[styles.greyButtonContainerOutline, backgroundColor && { backgroundColor }]} activityOpacity={0.5}>
        <Text style={styles.greyButtonTextOutline}>{title}</Text>
    </TouchableOpacity>
}

/* ^^^^^^^^^^^^^^^^^^^^ INPUTS ^^^^^^^^^^^^^^^^^^^^ */
const UserInput = ({ placeholder, onChangeText }) => {
    return <Input
        placeholder={placeholder}
        leftIcon={<FontAwesome name="user" size={16} color={greyLightTa} />}
        onChangeText={onChangeText}
    />;
}
const EmailInput = ({ onChangeText }) => {
    return <Input
        placeholder='Votre adresse email'
        leftIcon={
            <FontAwesome name="envelope" size={16} color={greyLightTa} />
        }
        onChangeText={onChangeText}
    />;
}
const PasswordInput = ({ onChangeText }) => {
    return <Input
        secureTextEntry={true}
        placeholder='Mot de passe'
        leftIcon={
            <FontAwesome name="unlock-alt" size={16} color={greyLightTa} />
        }
        onChangeText={onChangeText}
    />;
}
const SearchInput = ({ placeholder, onChangeText }) => {
    return <Input
        placeholder={placeholder}
        leftIcon={<FontAwesome name="search" size={16} color={greyLightTa} />}
        onChangeText={onChangeText}
    />;
}
const DefaultInput = ({ placeholder, onChangeText }) => {
    return <Input
        placeholder={placeholder}
        leftIcon={<FontAwesome name="search" size={16} color={greyLightTa} />}
        onChangeText={onChangeText}
    />;
}

/* ^^^^^^^^^^^^^^^^^^^^ TITLES ^^^^^^^^^^^^^^^^^^^^ */
const RallyeH1 = ({ text }) => {
    return <Text style={{
        fontFamily: 'Roboto_700Bold',
        fontSize: 25,
        color: greyDarkTa,
        textAlign: 'left',
    }}>
        {text}
    </Text>;
}
const RallyeH2 = ({ text }) => {
    return <Text style={{
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        color: greyDarkTa,
        textAlign: 'left',
    }}>
        {text}
    </Text>;
}
const RallyeH3 = ({ text }) => {
    return <Text style={{
        fontFamily: 'Roboto_700Bold',
        fontSize: 15,
        color: greyDarkTa,
        textAlign: 'left',
    }}>
        {text}
    </Text>;
}

/* ^^^^^^^^^^^^^^^^^^^^ AVATARS ^^^^^^^^^^^^^^^^^^^^ */
// Afficher le profil ou activer le burger menu
const ProfilAvatar = () => {
    return <Avatar
        rounded
        onPress={() => console.log("Afficher mon profil")}
        activeOpacity={0.7}
        containerStyle={{ marginHorizontal: 20 }}
    />;
}

// Modifier le profil
const EditProfilAvatar = () => {
    return <Avatar
        rounded
        source={{
            uri: 'https://media.istockphoto.com/photos/young-motorcyclist-with-vintage-helmet-picture-id157619003?k=6&m=157619003&s=170667a&w=0&h=-ZJnm31o78SHiEaP_vvud4tG5wDoyj7yDLGpdeRJ97U=',
        }}
        onPress={() => console.log("Modifier mon profil")}
        containerStyle={{ marginHorizontal: 20, backgroundColor: redTa, borderColor: greyLightTa, borderRadius: 50 }}
    >
        <Accessory
            containerStyle={{ backgroundColor: redTa, borderColor: greyLightTa, borderRadius: 50 }}
        />
    </Avatar>;
}

/* ^^^^^^^^^^^^^^^^^^^^ SOCIAL NETWORKS ^^^^^^^^^^^^^^^^^^^^ */

const FacebookSocialIco = () => {
    return <SocialIcon
        type='facebook'
    />;
}
const TwitterSocialIco = () => {
    return <SocialIcon
        type='twitter'
    />;
}
const InstagramSocialIco = () => {
    return <SocialIcon
        type='instagram'
    />;
}
const YouTubeSocialIco = () => {
    return <SocialIcon
        type='youtube'
    />;
}
const LinkedinSocialIco = () => {
    return <SocialIcon
        type='linkedin'
    />;
}

/* ^^^^^^^^^^^^^^^^^^^^ STYLES ^^^^^^^^^^^^^^^^^^^^ */
const styles = StyleSheet.create({
    redButtonContainer: {
        backgroundColor: redTa,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 28,
        marginVertical: 14,
        alignItems: 'center'
    },
    redButtonLogin: {
        backgroundColor: redTa,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 2,
        marginVertical: 14,
        marginRight: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: '20%',
    },
    redButtonText: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 16,
        color: whiteTa,
    },
    redButtonContainerOutline: {
        borderWidth: 1,
        borderColor: redTa,
        backgroundColor: whiteTa,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 28,
        marginVertical: 14,
        alignItems: 'center'
    },
    redButtonTextOutline: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 16,
        color: redTa,
    },
    greyButtonContainer: {
        backgroundColor: greyDarkTa,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 28,
        marginVertical: 14,
        alignItems: 'center'
    },
    greyButtonText: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 16,
        color: whiteTa,
    },
    greyButtonContainerOutline: {
        borderWidth: 1,
        borderColor: blackTa,
        backgroundColor: whiteTa,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 28,
        marginVertical: 14,
        alignItems: 'center'
    },
    greyButtonTextOutline: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 16,
        color: greyDarkTa,
    },
    rallyeInput: {
        backgroundColor: whiteTa,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: greyLightTa,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 0,
        alignItems: 'center',
    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    }
})

export {
    redTa, whiteTa, blackTa, greyDarkTa, greyLightTa, icoWhite,
    RedButtonLogin, RedButton, RedButtonOutline,
    GreyButton, GreyButtonOutline,
    RallyeH1, RallyeH2, RallyeH3,
    ProfilAvatar, EditProfilAvatar,
    FacebookSocialIco, TwitterSocialIco, InstagramSocialIco, YouTubeSocialIco, LinkedinSocialIco,
    UserInput, EmailInput, PasswordInput, SearchInput, DefaultInput
}