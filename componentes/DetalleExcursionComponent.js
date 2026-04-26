import { Component } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { Card, Text, Divider, IconButton } from "react-native-paper";
import { baseUrl } from "../comun/comun";
import { connect } from "react-redux";
import { comentarios } from "../redux/comentarios";
import { favoritos } from "../redux/favoritos";
import { postFavorito } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    comentarios: state.comentarios,
    excursiones: state.excursiones,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.image}
        >
          <Card.Title
            title={excursion.nombre}
            titleStyle={styles.titulo}
            style={styles.cardTitle}
          />
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
          <View style={styles.iconoContainer}>
            <IconButton
              icon={props.favorita ? "heart" : "heart-outline"}
              size={28}
              onPress={() =>
                props.favorita
                  ? console.log(
                      "La excursión ya se encuentra entre las favoritas",
                    )
                  : props.onPress()
              }
            />
          </View>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const formatearFecha = (fechaString) => {
    const fechaLimpia = fechaString.replace(/\s/g, "");
    const fecha = new Date(fechaLimpia);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Comentarios"
        style={styles.cardTitle}
        titleStyle={styles.tituloComentarios}
      />
      <Divider style={styles.lineaDivision} />
      <Card.Content style={styles.contenido}>
        {comentarios.map((item) => (
          <View key={item.id}>
            <View style={styles.descripcionComentarios}>
              <Text style={styles.valoracion}>{item.valoracion} estrellas</Text>
              <Text style={styles.autor}>{item.autor}</Text>

              <Text style={styles.comentario}>{item.comentario}</Text>

              <Text style={styles.dia}>{formatearFecha(item.dia)}</Text>
            </View>
            <Divider />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(
            (el) => el === excursionId,
          )}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId,
          )}
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
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    marginTop: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    alignSelf: "center",
  },
  cardTitle: {
    alignItems: "center",
  },
  tituloComentarios: {
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
  },
  lineaDivision: {
    marginHorizontal: 20,
  },
  contenido: {
    paddingRight: 8,
  },
  descripcionComentarios: {
    marginTop: 10,
    marginBottom: 10,
  },
  autor: {
    fontSize: 16,
    marginBottom: 5,
  },
  comentario: {
    fontSize: 14,
    marginBottom: 5,
  },
  valoracion: {
    position: "absolute",
    right: 0,
    fontSize: 12,
    textAlign: "right",
  },
  dia: {
    textAlign: "right",
    fontSize: 10,
    color: "grey",
  },
  iconoContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
