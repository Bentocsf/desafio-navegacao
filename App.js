
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Notícias de tecnologia
const noticiasTecnologia = [
  {
    id: '1',
    categoria: 'TECNOLOGIA',
    titulo: 'Inteligência Artificial',
    descricao: 'Novas ferramentas de IA estão transformando a tecnologia.',
    conteudo:
      'A inteligência artificial está sendo utilizada para automatizar tarefas, analisar informações e auxiliar na criação de novas soluções.',
  },
  {
    id: '2',
    categoria: 'TECNOLOGIA',
    titulo: 'Celulares e inovação',
    descricao: 'Conheça as novidades do mercado de smartphones.',
    conteudo:
      'Os smartphones continuam evoluindo com melhorias nas câmeras, no desempenho e na bateria.',
  },
  {
    id: '3',
    categoria: 'TECNOLOGIA',
    titulo: 'Segurança digital',
    descricao: 'Dicas para proteger seus dados na internet.',
    conteudo:
      'Senhas fortes, autenticação em dois fatores e atenção a links suspeitos ajudam a proteger informações pessoais.',
  },
];

// Notícias de esportes
const noticiasEsportes = [
  {
    id: '4',
    categoria: 'ESPORTES',
    titulo: 'Futebol',
    descricao: 'Confira as principais notícias do mundo do futebol.',
    conteudo:
      'Equipes disputam campeonatos, desenvolvem estratégias e buscam melhorar seu desempenho em campo.',
  },
  {
    id: '5',
    categoria: 'ESPORTES',
    titulo: 'Olimpíadas',
    descricao: 'Veja novidades e destaques do esporte mundial.',
    conteudo:
      'Os Jogos Olímpicos reúnem atletas de diversos países em modalidades esportivas variadas.',
  },
  {
    id: '6',
    categoria: 'ESPORTES',
    titulo: 'Maratonista surpreende',
    descricao:
      'Atleta vence prova de rua e estabelece melhor marca pessoal.',
    conteudo:
      'Em uma prova marcada por forte calor, o maratonista alcançou o melhor tempo de sua carreira.',
  },
];

const Stack = createNativeStackNavigator();

// Card reutilizável para cada notícia
function CardNoticia({ noticia, aoPressionar }) {
  return (
    <Pressable
      style={styles.card}
      onPress={aoPressionar}
    >
      <Text style={styles.categoria}>{noticia.categoria}</Text>

      <Text style={styles.titulo}>{noticia.titulo}</Text>

      <Text style={styles.descricao}>{noticia.descricao}</Text>
    </Pressable>
  );
}

// Lista de notícias
function ListaNoticias({ route, navigation }) {
  const noticias = route.params.noticias;

  return (
    <ScrollView style={styles.tela}>
      {noticias.map((noticia) => (
        <CardNoticia
          key={noticia.id}
          noticia={noticia}
          aoPressionar={() =>
            navigation.navigate('Detalhes', { noticia })
          }
        />
      ))}
    </ScrollView>
  );
}

// Tela com o conteúdo completo da notícia
function DetalhesNoticia({ route }) {
  const { noticia } = route.params;

  return (
    <ScrollView style={styles.telaDetalhes}>
      <Text style={styles.categoria}>{noticia.categoria}</Text>

      <Text style={styles.tituloDetalhes}>{noticia.titulo}</Text>

      <Text style={styles.descricaoDetalhes}>{noticia.descricao}</Text>

      <View style={styles.linha} />

      <Text style={styles.conteudo}>{noticia.conteudo}</Text>
    </ScrollView>
  );
}

// Navegação Stack de uma categoria
function NavegacaoNoticias({ route }) {
  const { categoria, noticias } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        component={ListaNoticias}
        initialParams={{ noticias }}
        options={{ title: categoria }}
      />

      <Stack.Screen
        name="Detalhes"
        component={DetalhesNoticia}
        options={{ title: 'Detalhes da notícia' }}
      />
    </Stack.Navigator>
  );
}

// Tela inicial para escolher uma categoria
function Inicio({ navigation }) {
  return (
    <View style={styles.inicio}>
      <Text style={styles.tituloInicio}>Mini App de Notícias</Text>

      <Text style={styles.subtituloInicio}>
        Escolha uma categoria para conferir as notícias.
      </Text>

      <Pressable
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Tecnologia', {
            categoria: 'Tecnologia',
            noticias: noticiasTecnologia,
          })
        }
      >
        <Text style={styles.textoBotao}>Tecnologia</Text>
      </Pressable>

      <Pressable
        style={styles.botao}
        onPress={() =>
          navigation.navigate('Esportes', {
            categoria: 'Esportes',
            noticias: noticiasEsportes,
          })
        }
      >
        <Text style={styles.textoBotao}>Esportes</Text>
      </Pressable>
    </View>
  );
}

// Navegação principal temporária
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ title: 'Notícias' }}
        />

        <Stack.Screen
          name="Tecnologia"
          component={NavegacaoNoticias}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Esportes"
          component={NavegacaoNoticias}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  categoria: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1769aa',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222222',
  },
  descricao: {
    fontSize: 14,
    color: '#555555',
  },
  telaDetalhes: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  tituloDetalhes: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },
  descricaoDetalhes: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
  },
  linha: {
    height: 1,
    backgroundColor: '#dddddd',
    marginVertical: 20,
  },
  conteudo: {
    fontSize: 17,
    lineHeight: 27,
    color: '#333333',
  },
  inicio: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  tituloInicio: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#222222',
  },
  subtituloInicio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555555',
    marginBottom: 28,
  },
  botao: {
    backgroundColor: '#1769aa',
    padding: 18,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
