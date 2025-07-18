import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  fileType :"",
  lastUpdate: 0,
  light: false,
  count: 0,
  color: "#000000", // Default color state (black)
  category: "Finance", // Default category state
  selectedResume: null,
  // Data added
  resumeId: 4,
  resumeDataIT3: {
    name: "JIMOTHY BAGATSING, CPA",
    contactInfo: {
      phone: "0123 456 7890",
      email: "hello@reallygreatsite.com",
      address: "123 Diwa St., Kalayaan City 1234",
    },
    linkedinUrl: "https://linkedin.com/in/name",
    workExperience: [
      {
        title: "TAX MANAGER",
        company: "Washimi Laundry",
        startDate: "June 2020",
        endDate: "Present",
        details: [
          "Assisted in the preparation of annual budgets and financial forecasts",
          "Conducted regular audits of financial records and processes to ensure compliance with accounting standards and regulations",
        ],
      },
      {
        title: "STAFF ACCOUNTANT",
        company: "Bangon Savings Bank",
        startDate: "January 2018",
        endDate: "May 2020",
        details: [
          "Collaborated with other departments to resolve accounting-related issues and provide financial guidance",
          "Maintained accurate and up-to-date records of financial transactions and documentation",
          "Utilized accounting software and tools to streamline processes and improve efficiency.",
        ],
      },
    ],
    skills: [
      "Accounting principles",
      "Tax laws",
      "Financial data analytics",
      "Expert in accounting software and tools",
      "Communication of financial information to stakeholders",
    ],
    education: [
      {
        degree: "BACHELOR IN ACCOUNTING",
        institution: "Las Felipinas University",
        startYear: "2014",
        endYear: "2018",
      },
      {
        degree: "MASTER IN BUSINESS ADMINISTRATION",
        institution: "Kalayaan Business School",
        startYear: "2021",
        endYear: "2023",
      },
    ],
    certification: [
      {
        title: "CERTIFIED PUBLIC ACCOUNTANT (CPA)",
        year: "2021",
        authority: "Professional Regulations Commission",
      },
      {
        title: "CERTIFIED FINANCIAL ANALYST (CFA)",
        year: "2022",
        authority: "CFA Institute",
      },
    ],
    awards: [
      {
        title: "Outstanding Accountant of the Year",
        year: "2022",
        awarder: "Accounting Association of the Philippines",
      },
      {
        title: "Best in Taxation",
        year: "2021",
        awarder: "Philippine Institute of Certified Public Accountants",
      },
    ],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILE_TYPE": return {
      ...state,
      fileType : action.fileType
    }
    case "TICK":
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "RESET":
      return {
        ...state,
        count: initialState.count,
      };
    case "SET_COLOR": // Action to set the color
      return {
        ...state,
        color: action.color,
      };
    case "RESET_COLOR": // Action to reset the color to the initial state
      return {
        ...state,
        color: initialState.color,
      };
    case "SET_CATEGORY": // Action to set the category
      return {
        ...state,
        category: action.category,
      };
    case "RESET_CATEGORY": // Action to reset the category to the initial state
      return {
        ...state,
        category: initialState.category,
      };
    // Case for resume selection
    case "SET_SELECTED_RESUME":
      return {
        ...state,
        selectedResume: action.resume,
      };
    case "RESET_SELECTED_RESUME":
      return {
        ...state,
        selectedResume: null,
      };
    // Updation for resume template
    case "SET_RESUME_DATA_IT3":
      console.log(action.resumeData)
      return {
        ...state,
        resumeDataIT3: action.resumeData,
      };
    case "RESET_RESUME_DATA_IT3":
      return {
        ...state,
        resumeDataIT3: {}, // Reset to an empty object
      };

    // Resume id
    case "SET_RESUME_ID":
      return {
        ...state,
        resumeId: action.resumeId,
      };
    case "RESET_RESUME_ID":
      return {
        ...state,
        resumeId: "", // Reset to an empty string
      };

    // Add scetion
    case "ADD_SECTION":
      return {
        ...state,
        resumeDataIT3: {
          ...state.resumeDataIT3,
          [action.sectionType]: initialState.resumeDataIT3[action.sectionType],
        },
      };
    case "REMOVE_SECTION":
      return {
        ...state,
        resumeDataIT3: {
          ...state.resumeDataIT3,
          [action.sectionType]: [],
        },
      };

    

   
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

// Actions for color
export const setColor = (color) => ({
  type: "SET_COLOR",
  color,
});

export const resetColor = () => ({
  type: "RESET_COLOR",
});

// Actions for category
export const setCategory = (category) => ({
  type: "SET_CATEGORY",
  category,
});

export const resetCategory = () => ({
  type: "RESET_CATEGORY",
});

// Selection of resume
export const setSelectedResume = (resume) => ({
  type: "SET_SELECTED_RESUME",
  resume,
});

export const resetSelectedResume = () => ({
  type: "RESET_SELECTED_RESUME",
});

// Action for setting resumeDataIT3
export const setResumeDataIT3 = (resumeData) => ({
  type: "SET_RESUME_DATA_IT3",
  resumeData,
});

// Action for resetting resumeDataIT3
export const resetResumeDataIT3 = () => ({
  type: "RESET_RESUME_DATA_IT3",
});

// Actions for resumeId
export const setResumeId = (resumeId) => ({
  type: "SET_RESUME_ID",
  resumeId,
});

export const resetResumeId = () => ({
  type: "RESET_RESUME_ID",
});

// Actions for adding and removing sections
export const addSection = (sectionType) => ({
  type: "ADD_SECTION",
  sectionType,
});

export const removeSection = (sectionType) => ({
  type: "REMOVE_SECTION",
  sectionType,
});


export const setFileType = (fileType) => ({
  type: "FILE_TYPE",
  fileType,
});
