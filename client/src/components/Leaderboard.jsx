import React from "react";
import { FaTrophy, FaMedal, FaStar, FaClock } from "react-icons/fa";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const Leaderboard = ({ leaderboardData }) => {
  const getPositionIcon = (position) => {
    switch (position) {
      case 0:
        return <FaTrophy className="text-yellow-400 text-3xl animate-bounce" />;
      case 1:
        return <FaMedal className="text-slate-400 text-2xl animate-pulse" />;
      case 2:
        return <FaMedal className="text-amber-700 text-2xl animate-pulse" />;
      default:
        return (
          <span className="text-gray-600 font-bold text-xl">
            {position + 1}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            Quiz Champions
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Celebrating Our Top Performers
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="divide-y divide-gray-100">
            <TransitionGroup>
              {leaderboardData.map((user, index) => (
                <CSSTransition key={user.id} timeout={500} classNames="fade">
                  <div
                    className={`flex items-center p-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg ${
                      index < 3
                        ? "bg-gradient-to-r from-purple-50/50 to-blue-50/50"
                        : ""
                    }
                      ${index === 0 ? "bg-yellow-50/70" : ""}
                      hover:bg-white/90 hover:translate-x-1`}
                  >
                    <div className="flex-shrink-0 w-12 flex justify-center">
                      {getPositionIcon(index)}
                    </div>
                    <div className="flex-shrink-0 relative group">
                      <img
                        className="h-14 w-14 rounded-full object-cover border-2 border-indigo-200 group-hover:border-indigo-400 transition-all duration-300 shadow-lg hover:rotate-6"
                        src={`${user.avatar}?w=100&h=100&fit=crop`}
                        alt={user.name}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                        }}
                      />
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1">
                          <FaStar
                            className={`${
                              index === 0
                                ? "text-yellow-400"
                                : index === 1
                                ? "text-slate-400"
                                : "text-amber-700"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                            {user.name}
                          </h2>
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full hover:scale-105 transition-transform">
                          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            {user.score}
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-600">
                            points
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/90 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
            <FaClock className="text-indigo-500 mr-2" />
            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
