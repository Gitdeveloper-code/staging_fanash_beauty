import React from 'react';

function ProtectedRoute(props:any) {
    return (
        <div>
            <h2>props</h2>
        </div>
    );
}

export default ProtectedRoute;

























// 'use client'
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// type ProtectedRouteProps = {
//   path: string;
//   component: React.ComponentType<any>;
//   exact?: boolean;
// };

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const { user } = useAuth();

//   return (
//     // <Route
//     //   {...rest}
//     //   render={(props:any) =>
//     //     user?.role === 'admin' ? (
//     //       <Component {...props} />
//     //     ) : (
//     //       <Navigate to="/login" />
//     //     )
//     //   }
//     // />
//     <div>
//         <h2>sdvg</h2>
//     </div>
//   );
// };

// export default ProtectedRoute;
