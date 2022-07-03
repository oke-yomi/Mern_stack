import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkoutContext();

	const handleDelete = async () => {
		const response = await fetch("/api/workouts/" + workout._id, {
			method: "DELETE",
		});
		const json = await response.json();

		if (response.ok) {
			dispatch({ type: "DELETE_WORKOUT", payload: json });
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Reps: </strong>
				{workout.reps}
			</p>
			<p>
				{formatDistanceToNow(new Date(workout.createdAt), { addSuffox: true })}
			</p>
			<span onClick={handleDelete}>🗑️</span>
		</div>
	);
};

export default WorkoutDetails;
