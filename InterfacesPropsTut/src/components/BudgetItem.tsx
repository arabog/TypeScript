import React from 'react';
import Budget from './Interfaces';


export const BudgetItem:React.FC<Budget> = ({budgeted, category, spent}: Budget) => {
          const remainingAmount: number = (budgeted - spent) > 0 ? budgeted - spent : 0;
          
          return <tr>
                              <td>
                                        <h5>{category}</h5>
                              </td>

                              <td>
                                        <h5>{"$" + budgeted}</h5>
                              </td>

                              <td>
                                        <h5>{"$" + spent}</h5>
                              </td>

                              <td>
                                        <h5>{"$" + remainingAmount}</h5>
                              </td>
                    </tr>
};
