import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { ProjectList } from './ProjectList';
import { ProjectDetail } from './ProjectDetail';
import { ProjectRequestForm } from './ProjectRequestForm';
import { mockProjects } from './mockProjects';

export const ProjectWorkspacePage = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Project Workspace
      </Typography>
      <Typography color="textSecondary" paragraph>
        프로젝트/워크스페이스 관리 PoC (mock data 기반)
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
        indicatorColor="primary"
        textColor="primary"
        style={{ marginBottom: 16 }}
      >
        <Tab label="프로젝트 목록" />
        <Tab label="프로젝트 생성 신청" />
      </Tabs>

      {tabIndex === 0 && (
        <Box>
          <ProjectList
            projects={mockProjects}
            selectedId={selectedProject.id}
            onSelect={setSelectedProject}
          />
          <Box marginTop={3}>
            <ProjectDetail project={selectedProject} />
          </Box>
        </Box>
      )}

      {tabIndex === 1 && <ProjectRequestForm />}
    </Box>
  );
};
