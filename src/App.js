import Directory from "./components/directory/directory.component";



const App = () => {

  return (
    <>
      <Directory />
    </>
  );
};


//   return (

//     <div className="categories-container">
//       {categories.map
//         (({ id, title, imageUrl }) => (
//           <div
//             className="category-container"
//             key={id}>
//             <div className="background-image"
//               style={{ backgroundImage: `url(${imageUrl})` }} />
//             <div className="category-body-container">
//               <h2>{title}</h2>
//               <p>Shop Now</p>
//             </div>
//           </div>)
//         )
//       }

//     </div>
//   );
// }

export default App;
