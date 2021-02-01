import createDataContext from "./createDataContext";

const ModalReducer = (state, action) => {
	switch (action.type) {
		case "modal_set":
			return {
				id: action.payload.id,
				modalProps: action.payload.modalProps,
			};

		default:
			return state;
	}
};

const showModal = dispatch => details => {
	dispatch({ type: "modal_set", payload: details });
};

const hideModal = dispatch => () => {
	dispatch({ type: "modal_set", payload: "" });
};

export const { Context, Provider } = createDataContext(
	ModalReducer,
	{ showModal, hideModal },
	{ id: "", modalProps: "" }
);
