import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// This assumes you have a getOne function in your service
// You will need to build the WorkoutCard component similarly to ProgramCard
// import programService from '../services/programs';
// import { WorkoutCard } from './Workouts';

const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Dummy data for now
  const dummyProgram = {
      id: '1',
      title: 'Full Body Blast',
      description: 'A comprehensive full-body workout designed to build strength and endurance.',
      mediaUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
      workouts: [
          { id: 'w1', title: 'Day 1: Upper Body', description: 'Focus on chest, shoulders, and triceps.'},
          { id: 'w2', title: 'Day 2: Lower Body', description: 'Legs and glutes focused workout.'},
          { id: 'w3', title: 'Day 3: Core & Cardio', description: 'High-intensity interval training.'},
      ]
  };

  useEffect(() => {
    // Replace this with a real API call
    // const fetchProgram = async () => {
    //   setLoading(true);
    //   const data = await programService.getOne(id);
    //   setProgram(data);
    //   setLoading(false);
    // };
    // fetchProgram();
    
    // Using dummy data
    setProgram(dummyProgram);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!program) {
    return <div className="text-center text-2xl">Program not found.</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="hero h-96 bg-base-200 rounded-lg" style={{ backgroundImage: `url(${program.mediaUrl})` }}>
        <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{program.title}</h1>
            <p className="mb-5">{program.description}</p>
            <button className="btn btn-primary">Start Program</button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Workouts in this Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* You would map over program.workouts and render WorkoutCard components */}
          {program.workouts.map(workout => (
            <div key={workout.id} className="card bg-base-100 shadow-xl">
                 <div className="card-body">
                    <h2 className="card-title">{workout.title}</h2>
                    <p>{workout.description}</p>
                    <div className="card-actions justify-end">
                       <button className="btn btn-primary btn-sm">View Workout</button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
