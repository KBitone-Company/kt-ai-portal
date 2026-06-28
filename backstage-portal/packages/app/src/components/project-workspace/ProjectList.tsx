import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Project } from './types';
import { ProjectStatusChip } from './ProjectStatusChip';

export const ProjectList = ({
  projects,
  selectedId,
  onSelect,
}: {
  projects: Project[];
  selectedId?: string;
  onSelect: (project: Project) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>프로젝트명</TableCell>
            <TableCell>상태</TableCell>
            <TableCell>보안등급</TableCell>
            <TableCell>소유 조직</TableCell>
            <TableCell>PM</TableCell>
            <TableCell>기간</TableCell>
            <TableCell>워크스페이스</TableCell>
            <TableCell>리소스 요약</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(project => (
            <TableRow
              key={project.id}
              hover
              selected={selectedId === project.id}
              onClick={() => onSelect(project)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <ProjectStatusChip status={project.status} />
              </TableCell>
              <TableCell>{project.securityLevel}</TableCell>
              <TableCell>{project.ownerOrganization}</TableCell>
              <TableCell>{project.pm.name}</TableCell>
              <TableCell>
                {project.startDate} ~ {project.endDate}
              </TableCell>
              <TableCell>{project.workspaceStatus}</TableCell>
              <TableCell>
                CPU {project.quota.cpuCores} / GPU {project.quota.gpuCount} / Mem{' '}
                {project.quota.memoryGiB}GiB
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
