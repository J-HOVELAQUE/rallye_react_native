import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';


// Importer la librairie de composants
import {
    RedButton, RedButtonOutline,
    GreyButton, GreyButtonOutline,
    RallyeH1, RallyeH2, RallyeH3,
    ProfilAvatar, EditProfilAvatar,
    FacebookSocialIco, TwitterSocialIco, InstagramSocialIco, YouTubeSocialIco, LinkedinSocialIco,
    UserInput, EmailInput, PasswordInput
} from '../components/rallye-lib';

export default function LibraryScreen() {
    var nom;

    return (

        <View style={{ flex: 1, backgroundColor: '', alignItems: "center" }}><Text>Librairie</Text>
            <ScrollView>
                <Text style={{ color: 'white' }}>Librairie composants</Text>

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Les boutons :</Text>
                <RedButton onPress={() => { nom() }} title="Bouton A" />
                <RedButtonOutline onPress={() => { nom() }} title="Bouton AB" />
                <GreyButton onPress={() => { nom() }} title="Bouton B" />
                <GreyButtonOutline onPress={() => { nom() }} title="Bouton BC" />

                <Divider style={{ backgroundColor: '#000000', margin: 10, }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Les titres :</Text>
                <RallyeH1 text="Titre H1" />
                <RallyeH2 text="Titre H2" />
                <RallyeH3 text="Titre H3" />

                <Divider style={{ backgroundColor: '#000000', margin: 10 }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>Avatar :</Text>
                <View style={{ flexDirection: 'row' }}>
                    {/* Taille "medium". Avatar normal pr afficher le burger menu si logué */}
                    <ProfilAvatar />
                    {/* Taille "small". Avatar avec crayon pour modifier son profil */}
                    <EditProfilAvatar />
                </View>

                <Divider style={{ backgroundColor: '#000000', margin: 10 }} />

                <Text style={{ textTransform: 'uppercase', textAlign: 'center' }}>social networks :</Text>
                <View style={{ flexDirection: 'row' }}>
                    <FacebookSocialIco />
                    <TwitterSocialIco />
                    <InstagramSocialIco />
                    <YouTubeSocialIco />
                    <LinkedinSocialIco />
                </View>



                <UserInput />
                <EmailInput /> 
                <PasswordInput />

            </ScrollView>
        </View>
    );
}

