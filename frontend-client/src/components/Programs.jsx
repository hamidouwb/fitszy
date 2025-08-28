import { Link } from 'react-router-dom'

// Single Program Card Component
export const ProgramCard = ({ program }) => (
  <Link to={`/programs/${program.id}`} className="card w-64 md:w-72 bg-base-100 shadow-xl image-full transform-gpu transition-transform hover:scale-105">
    <figure><img src={program.mediaUrl} alt={program.title} className="object-cover w-full h-full" /></figure>
    <div className="card-body justify-end p-4">
      <h2 className="card-title text-white">{program.title}</h2>
      <p className="text-gray-300 text-sm truncate">{program.description}</p>
    </div>
  </Link>
)

// Carousel to display a list of programs
export const ProgramsCarousel = ({ title, programs }) => (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <button className="btn btn-ghost btn-sm">Show All</button>
    </div>
    {programs.length > 0 ? (
      <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
        {programs.map(program => (
          <div key={program.id} className="carousel-item">
            <ProgramCard program={program} />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center p-8 bg-base-100 rounded-box">
          <p>No programs to display in this category yet.</p>
      </div>
    )}
  </section>
)
