import { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Card,
  Text,
  Divider,
  IconButton,
  Icon,
  TextInput,
  Button,
} from "react-native-paper";
import { baseUrl } from "../comun/comun";
import { connect } from "react-redux";
import { comentarios } from "../redux/comentarios";
import { favoritos } from "../redux/favoritos";
import { postComentario, postFavorito } from "../redux/ActionCreators";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mapStateToProps = (state) => {
  return {
    comentarios: state.comentarios,
    excursiones: state.excursiones,
    favoritos: state.favoritos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario)),
});

function RenderModal(props) {
  const estrellas = [1, 2, 3, 4, 5];
  const etiquetasPuntuacion = {
    1: "Muy mala",
    2: "Mala",
    3: "Normal",
    4: "Buena",
    5: "Excelente",
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.toggleModal()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.tituloModal}>Añadir comentario</Text>
            <View style={styles.iconoContainer}>
              {estrellas.map((estrella) => {
                return (
                  <IconButton
                    icon={
                      estrella <= props.valoracion ? "star" : "star-outline"
                    }
                    iconColor="gold"
                    size={28}
                    key={estrella}
                    onPress={() => props.setValoracion(estrella)}
                  />
                );
              })}
            </View>
            <Text style={styles.textoPuntuacion}>
              {etiquetasPuntuacion[props.valoracion]}
            </Text>
            <TextInput
              label="Autor"
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
              value={props.autor}
              onChangeText={(text) => props.setAutor(text)}
              theme={{ colors: { primary: "#2c3e50" } }}
            />
            <TextInput
              label="Comentario"
              mode="outlined"
              left={<TextInput.Icon icon="comment-text" />}
              multiline
              numberOfLines={4}
              style={styles.input}
              value={props.comentario}
              onChangeText={(text) => props.setComentario(text)}
              theme={{ colors: { primary: "#2c3e50" } }}
            />
            <View style={styles.botonera}>
              <Pressable
                onPress={() => props.resetForm()}
                style={[styles.button, styles.buttonClose]}
              >
                <MaterialCommunityIcons name="close" size={22} />
                <Text style={styles.textStyle}>CANCELAR</Text>
              </Pressable>

              <Pressable
                onPress={() => props.gestionarComentario()}
                style={[styles.button, styles.buttonEnviar]}
              >
                <MaterialCommunityIcons name="send" size={20} color="white" />
                <Text style={styles.textEnviar}> ENVIAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

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
            <RenderModal
              modalVisible={props.modalVisible}
              toggleModal={props.toggleModal}
              resetForm={props.resetForm}
              gestionarComentario={props.gestionarComentario}
              valoracion={props.valoracion}
              autor={props.autor}
              comentario={props.comentario}
              setValoracion={props.setValoracion}
              setAutor={props.setAutor}
              setComentario={props.setComentario}
            />
            <IconButton
              icon="pencil"
              size={28}
              onPress={() => props.toggleModal()}
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
  constructor(props) {
    super(props);
    this.state = {
      valoracion: 5,
      autor: "",
      comentario: "",
      showModal: false,
    };
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  setValoracion(valoracion) {
    this.setState({ valoracion });
  }
  setAutor(autor) {
    this.setState({ autor });
  }
  setComentario(comentario) {
    this.setState({ comentario });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: "",
      comentario: "",
      showModal: false,
    });
  }

  gestionarComentario() {
    const { excursionId } = this.props.route.params;
    const { valoracion, autor, comentario } = this.state;
    this.props.postComentario(excursionId, valoracion, autor, comentario);
    this.resetForm();
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
          modalVisible={this.state.showModal}
          toggleModal={() => this.toggleModal()}
          resetForm={() => this.resetForm()}
          gestionarComentario={() => this.gestionarComentario()}
          valoracion={this.state.valoracion}
          autor={this.state.autor}
          comentario={this.state.comentario}
          setValoracion={(valoracion) => this.setValoracion(valoracion)}
          setAutor={(autor) => this.setAutor(autor)}
          setComentario={(comentario) => this.setComentario(comentario)}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  tituloModal: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
  textoPuntuacion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  botonera: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    borderRadius: 30,
    padding: 9,
    marginHorizontal: 5,
    minWidth: 100,
  },
  buttonEnviar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#30718d",
    color: "white",
  },
  textEnviar: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonClose: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#30718d",
    borderColor: "#30718d",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
