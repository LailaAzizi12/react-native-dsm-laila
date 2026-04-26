import { Component } from "react";
import { ScrollView, View, StyleSheet, ImageBackground } from "react-native";
import { Card, Text } from "react-native-paper";
import { baseUrl } from "../comun/comun";
import { connect } from "react-redux";
import { IndicadorActividad } from "./IndicadorActividadComponent";

const mapStateToProps = (state) => {
  return {
    cabeceras: state.cabeceras,
    excursiones: state.excursiones,
    actividades: state.actividades,
  };
};

function RenderItem(props) {
  const { item, isLoading, errMess } = props;

  if (isLoading) {
    return <IndicadorActividad />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else {
    if (!item) {
      return <View />;
    }

    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + item.imagen }}
          style={styles.image}
        >
          <Card.Title
            title={item.nombre}
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />
        </ImageBackground>

        <Card.Content>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={
            this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]
          }
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem
          item={
            this.props.excursiones.excursiones.filter(
              (item) => item.destacado,
            )[0]
          }
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem
          item={
            this.props.actividades.actividades.filter(
              (item) => item.destacado,
            )[0]
          }
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 150,
    marginHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    color: "chocolate",
    fontWeight: "bold",
    fontSize: 25,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 10,
    alignSelf: "center",
  },
  cardTitle: {
    alignItems: "center",
  },
});

export default connect(mapStateToProps)(Home);
