import { Component } from "react";
import { FlatList, View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Divider, Card, Text } from "react-native-paper";
import { baseUrl } from "../comun/comun";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    actividades: state.actividades,
    historia: state.historia,
  };
};

function RenderHistoria({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.titulo}
        titleStyle={styles.titulo}
        style={styles.cardTitle}
      />
      <Divider style={styles.lineaDivision} />
      <Card.Content style={styles.contenido}>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
      </Card.Content>
    </Card>
  );
}

function Historia({ item }) {
  return <RenderHistoria item={item} />;
}

class QuienesSomos extends Component {
  render() {
    const renderActividadesItem = ({ item }) => {
      return (
        <View>
          <List.Item
            title={item.nombre}
            description={item.descripcion}
            titleNumberOfLines={0}
            descriptionNumberOfLines={6}
            left={(props) => (
              <Image
                source={{ uri: baseUrl + item.imagen }}
                style={[props.style, styles.imagen]}
                resizeMode="cover"
              />
            )}
            descriptionStyle={styles.descripcion}
          />
          <Divider />
        </View>
      );
    };

    return (
      <ScrollView>
        <Historia item={this.props.historia.historia[0]} />
        <Card style={styles.card}>
          <Card.Title
            title="Actividades y recursos"
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />
          <Divider style={styles.lineaDivision} />
          <Card.Content style={styles.contenido}>
            <FlatList
              data={this.props.actividades.actividades}
              renderItem={renderActividadesItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagen: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  contenido: {
    paddingRight: 8,
  },
  titulo: {
    fontSize: 16,
  },
  descripcion: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    margin: 8,
  },
  lineaDivision: {
    marginHorizontal: 20,
  },
  contenido: {
    margin: 12,
  },
  descripcion: {
    marginTop: 20,
  },
  titulo: {
    marginTop: 15,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
  },
  cardTitle: {
    alignItems: "center",
  },
});

export default connect(mapStateToProps)(QuienesSomos);
