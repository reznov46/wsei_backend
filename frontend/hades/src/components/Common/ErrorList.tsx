import React from 'react';
import { formStyles } from '../../styles/formCard';

export const ErrorList: React.FC<{ errors: string[] }> = ({ errors }) => (
  <div style={formStyles.errorArray}>
    <ul style={formStyles.ul}>
      {errors.map((err) => (
        <li
          key={err}
          style={formStyles.li}
        >
          {err}
        </li>
      ))}
    </ul>
  </div>
);