import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import WorkspaceControls from './WorkspaceControls';

const controlCount = 5; // workspace select + add, create, export, import buttons

describe('WorkspaceControls', () => {
  it('server-renders an inert placeholder with the same controls instead of nothing', () => {
    const html = renderToString(
      <WorkspaceProvider>
        <WorkspaceControls toolSlug="json-formatter" />
      </WorkspaceProvider>,
    );
    const container = document.createElement('div');
    container.innerHTML = html;

    const root = container.querySelector('[data-workspace-controls]');
    expect(root).toHaveAttribute('data-workspace-controls', 'pending');
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveAttribute('inert');
    const controls = root?.querySelectorAll('select, button') ?? [];
    expect(controls).toHaveLength(controlCount);
    controls.forEach((control) => expect(control).toBeDisabled());
    expect(root).toHaveTextContent('Add to workspace');
  });

  it('keeps the same controls and enables them once workspaces are loaded', async () => {
    const { container } = render(
      <WorkspaceProvider>
        <WorkspaceControls toolSlug="json-formatter" />
      </WorkspaceProvider>,
    );

    const select = await screen.findByRole('combobox', { name: 'Active workspace' });
    expect(select).toBeEnabled();
    const root = container.querySelector('[data-workspace-controls]');
    expect(root).toHaveAttribute('data-workspace-controls', 'ready');
    expect(root).not.toHaveAttribute('aria-hidden');
    expect(root).not.toHaveAttribute('inert');
    expect(root?.querySelectorAll('select, button')).toHaveLength(controlCount);
    screen.getAllByRole('button').forEach((button) => expect(button).toBeEnabled());
  });
});
