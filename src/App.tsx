import React from "react";
import logo from "./logo.svg";
import "./App.css";
interface State {
	items: Item[];
	loading: boolean;
	todoItem: string;
	offline: boolean;
	newContentAvailable: boolean;
}

interface Item {
	id: string;
	item: string;
}

function reducer(state: State, action: Partial<State>) {
	return { ...state, ...action };
}

const initialState: State = {
	items: [],
	loading: true,
	todoItem: "",
	offline: !navigator.onLine,
	newContentAvailable: false,
};

const App: React.FC = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	React.useEffect(() => {
		(async () => {
			try {
				const response = await fetch("http://localhost:4567/items.json");
				const result = await response.json();

				dispatch({
					items: result,
					loading: false,
				});
			} catch {}
		})();
		window.addEventListener("online", setOfflineStatus);
		window.addEventListener("offline", setOfflineStatus);
		window.addEventListener("newContentAvailable", setNewContentAvailable);

		return () => {
			window.removeEventListener("online", setOfflineStatus);
			window.removeEventListener("offline", setOfflineStatus);
			window.removeEventListener("newContentAvailable", setNewContentAvailable);
		};
	}, []);

	function setNewContentAvailable() {
		dispatch({
			newContentAvailable: true,
		});
	}

	function setOfflineStatus() {
		dispatch({
			offline: !navigator.onLine,
		});
	}

	async function addItem(e: React.FormEvent) {
		e.preventDefault();

		const response = await fetch("http://localhost:4567/items.json", {
			method: "POST",
			body: JSON.stringify({ item: state.todoItem }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (result.error) {
			alert(result.error);
		} else {
			dispatch({
				items: result,
				todoItem: "",
			});
		}
	}

	async function deleteItem(itemId: string) {
		const response = await fetch("http://localhost:4567/items.json", {
			method: "DELETE",
			body: JSON.stringify({ id: itemId }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();

		if (result.error) {
			alert(result.error);
		} else {
			dispatch({
				items: result,
			});
		}
	}

	return (
		<div className="App">
			<nav className="navbar navbar-light bg-light">
				<span className="navbar-brand mb-0 h1">
					<img src={logo} className="App-logo" alt="logo" />
					Todo List
				</span>

				{state.offline && <span className="badge badge-danger my-3">Offline</span>}
			</nav>

			<div className="px-3 py-2">
				<form className="form-inline my-3" onSubmit={(e: React.FormEvent) => addItem(e)}>
					<div className="form-group mb-2 p-0 pr-3 col-8 col-sm-10">
						<input
							className="form-control col-12"
							placeholder="What do you need to do?"
							value={state.todoItem}
							onChange={e => dispatch({ todoItem: e.target.value })}
						/>
					</div>
					<button type="submit" className="btn btn-primary mb-2 col-4 col-sm-2">
						Add
					</button>
				</form>
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}
				{state.newContentAvailable && (
					<div className="alert alert-info" role="alert">
						New content update is available, please reload the page
					</div>
				)}

				{state.loading && <p>Loading...</p>}

				{!state.loading && state.items.length === 0 && (
					<div className="alert alert-secondary">No items - all done!</div>
				)}

				{!state.loading && state.items && (
					<table className="table table-striped">
						<tbody>
							{state.items.map((item, i) => {
								return (
									<tr key={item.id} className="row">
										<td className="col-1">{i + 1}</td>
										<td className="col-10">{item.item}</td>
										<td className="col-1">
											<button
												type="button"
												className="close"
												aria-label="Close"
												onClick={() => deleteItem(item.id)}
											>
												<span aria-hidden="true">&times;</span>
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default App;
