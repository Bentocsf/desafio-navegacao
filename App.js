
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  View,
} from 'react-native';

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
    descricao: 'Atleta vence prova de rua e estabelece melhor marca pessoal.',
    conteudo:
      'Em uma prova marcada por forte calor, o maratonista alcançou o melhor tempo de sua carreira.',
  },
];

function CardNoticia({ categoria, titulo, descricao, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.categoria}>{categoria}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </Pressable>
  );
}

function ListaNoticias({ noticias, aoSelecionarNoticia }) {
  return (
    <ScrollView style={styles.lista}>
      {noticias.map((noticia) => (
        <CardNoticia
          key={noticia.id}
          categoria={noticia.categoria}
          titulo={noticia.titulo}
          descricao={noticia.descricao}
          onPress={() => aoSelecionarNoticia(noticia)}
        />
      ))}
    </ScrollView>
  );
}

function TelaTecnologia({ aoSelecionarNoticia }) {
  return (
    <ListaNoticias
      noticias={noticiasTecnologia}
      aoSelecionarNoticia={aoSelecionarNoticia}
    />
  );
}

function TelaEsportes({ aoSelecionarNoticia }) {
  return (
    <ListaNoticias
      noticias={noticiasEsportes}
      aoSelecionarNoticia={aoSelecionarNoticia}
    />
  );
}

export default function App() {
  function selecionarNoticia(noticia) {
    console.log('Notícia selecionada:', noticia.titulo);
  }

  return (
    <ScrollView style={styles.tela}>
      <Text style={styles.tituloSecao}>Tecnologia</Text>
      <View style={styles.secao}>
        <TelaTecnologia aoSelecionarNoticia={selecionarNoticia} />
      </View>

      <Text style={styles.tituloSecao}>Esportes</Text>
      <View style={styles.secao}>
        <TelaEsportes aoSelecionarNoticia={selecionarNoticia} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 16,
  },
  lista: {
    flexGrow: 0,
  },
  secao: {
    marginBottom: 12,
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
    color: 'blue',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#555555',
  },
});
