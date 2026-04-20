import { Component } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import { connect } from "react-redux";
import { contacto } from "../redux/contacto";

const mapStateToProps = (state) => {
  return {
    contacto: state.contacto,
  };
};

function RenderItem({ item }) {
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
        <Text style={styles.descripcion}>Tel: {item.telefono}</Text>
        <Text style={styles.descripcion}>Email: {item.correo}</Text>
      </Card.Content>
    </Card>
  );
}

class Contacto extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.contacto.contacto[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(Contacto);
